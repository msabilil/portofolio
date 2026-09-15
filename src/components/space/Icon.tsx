import type { SVGProps } from "react";
const paths = {
  arrow: "M5 19 19 5M5 5h14v14",
  down: "M12 4v16m-6-6 6 6 6-6",
  star: "m12 2 2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6Z",
  orbit: "M20 4C12-4-4 12 4 20S28 12 20 4ZM4 4c8-8 24 8 16 16S-4 12 4 4Z",
  code: "m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18",
  check: "m5 12 4 4L19 6",
  mail: "M3 5h18v14H3V5Zm0 1 9 7 9-7",
  copy: "M8 8h13v13H8V8ZM4 16H2V2h14v2",
  close: "m6 6 12 12M6 18 18 6",
  menu: "M4 6h16M4 12h16M4 18h16",
  globe:
    "M2 12h20M12 2c6 5 6 15 0 20-6-5-6-15 0-20ZM22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
} as const;

const compoundIcons = {
  blocks: (
    <>
      <path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2" />
      <rect x="14" y="2" width="8" height="8" rx="1" />
    </>
  ),
  panels: (
    <>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5M3 12A9 3 0 0 0 21 12" />
    </>
  ),
  workflow: (
    <>
      <rect width="8" height="8" x="3" y="3" rx="2" />
      <path d="M7 11v4a2 2 0 0 0 2 2h4" />
      <rect width="8" height="8" x="13" y="13" rx="2" />
    </>
  ),
} as const;

type IconName = keyof typeof paths | keyof typeof compoundIcons;

export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {name in compoundIcons
        ? compoundIcons[name as keyof typeof compoundIcons]
        : <path d={paths[name as keyof typeof paths]} />}
    </svg>
  );
}
