export type Contribution = { date: string; count: number; level: number };
export function parseContributions(value: unknown): Contribution[] {
  if (
    !value ||
    typeof value !== "object" ||
    !("contributions" in value) ||
    !Array.isArray(value.contributions) ||
    !value.contributions.length
  )
    throw new Error("Invalid contribution response");
  const dates = new Set<string>();
  return value.contributions
    .map((day: unknown) => {
      if (
        !day ||
        typeof day !== "object" ||
        !("date" in day) ||
        !("count" in day) ||
        !("level" in day) ||
        typeof day.date !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(day.date) ||
        !Number.isInteger(day.count) ||
        Number(day.count) < 0 ||
        !Number.isInteger(day.level) ||
        Number(day.level) < 0 ||
        Number(day.level) > 4 ||
        dates.has(day.date)
      )
        throw new Error("Invalid contribution day");
      dates.add(day.date);
      return {
        date: day.date,
        count: Number(day.count),
        level: Number(day.level),
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}
