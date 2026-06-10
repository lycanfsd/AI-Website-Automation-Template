import { cx } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "light";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  as = "h2",
  className,
}: SectionHeadingProps) {
  const HeadingTag = as;

  return (
    <div
      className={cx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={
            tone === "light"
              ? "mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-100"
              : "mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-copper-600"
          }
        >
          {eyebrow}
        </p>
      ) : null}
      <HeadingTag
        className={
          tone === "light"
            ? "text-balance text-3xl font-semibold leading-tight tracking-normal text-white sm:text-4xl"
            : "text-balance text-3xl font-semibold leading-tight tracking-normal text-ink sm:text-4xl"
        }
      >
        {title}
      </HeadingTag>
      {description ? (
        <p
          className={
            tone === "light"
              ? "mt-4 text-pretty text-base leading-7 text-zinc-200 sm:text-lg"
              : "mt-4 text-pretty text-base leading-7 text-zinc-600 sm:text-lg"
          }
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
