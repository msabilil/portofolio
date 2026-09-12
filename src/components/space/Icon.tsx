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
export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: keyof typeof paths }) {
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
      <path d={paths[name]} />
    </svg>
  );
}
