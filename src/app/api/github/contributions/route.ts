const GRAPHQL_QUERY = `
  query ContributionCalendar($from: DateTime!, $to: DateTime!) {
    viewer {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

type GraphqlContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel: string;
};

type GraphqlResponse = {
  data?: {
    viewer?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks: Array<{ contributionDays: GraphqlContributionDay[] }>;
        };
      };
    };
  };
  errors?: Array<{ message: string }>;
};

const contributionLevels: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export const revalidate = 3600;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    const response = await fetch(
      "https://github-contributions-api.jogruber.de/v4/msabilil?y=last",
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) {
      return Response.json(
        { message: "GitHub activity unavailable" },
        { status: 502 },
      );
    }

    return Response.json(await response.json());
  }

  const to = new Date();
  const from = new Date(to);
  from.setUTCFullYear(from.getUTCFullYear() - 1);

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      query: GRAPHQL_QUERY,
      variables: { from: from.toISOString(), to: to.toISOString() },
    }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return Response.json(
      { message: "GitHub activity unavailable" },
      { status: 502 },
    );
  }

  const result = (await response.json()) as GraphqlResponse;
  if (result.errors?.length) {
    return Response.json(
      { message: "GitHub activity unavailable" },
      { status: 502 },
    );
  }

  const days =
    result.data?.viewer?.contributionsCollection?.contributionCalendar?.weeks.flatMap(
      (week) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: contributionLevels[day.contributionLevel] ?? 0,
        })),
    ) ?? [];

  return Response.json({ contributions: days });
}
