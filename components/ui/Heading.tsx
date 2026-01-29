import React from "react";
import classNames from "classnames";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export function Heading({
  level = 1,
  className = "",
  children,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as HeadingTag;

  const sizes = [
    "text-4xl", // h1
    "text-3xl", // h2
    "text-2xl", // h3
    "text-xl", // h4
    "text-lg", // h5
    "text-base", // h6
  ];

  return (
    <Tag
      className={classNames(
        "font-bold text-zinc-900 dark:text-zinc-100 mb-2",
        sizes[level - 1],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
