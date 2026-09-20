import Image from "next/image";
import { iconUrl } from "@/lib/techIcons";

const imageSizes = {
  13: "h-[13px] w-[13px]",
  24: "h-6 w-6",
  42: "h-[42px] w-[42px]",
} as const;

export function TechLogo({
  slug,
  size = 24,
}: {
  slug?: string;
  size?: keyof typeof imageSizes;
}) {
  if (!slug) return null;
  const isReact = slug === "react";

  return (
    <span
      aria-hidden="true"
      data-tech-logo={slug}
      className={[
        "inline-grid shrink-0 place-items-center",
        isReact && "rounded-full bg-[#152739]",
        isReact && (size === 13 ? "p-0.5" : "p-1.5"),
      ].filter(Boolean).join(" ")}
    >
      <Image
        src={iconUrl(slug)}
        alt=""
        width={size}
        height={size}
        sizes={`${size}px`}
        className={`block bg-transparent! object-contain ${imageSizes[size]}`}
      />
    </span>
  );
}
