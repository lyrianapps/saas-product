import React from "react";

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export function Paragraph({
  className = "",
  children,
  ...props
}: ParagraphProps) {
  return (
    <p className={`text-gray-700 text-base ${className}`} {...props}>
      {children}
    </p>
  );
}
