import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  className = "",
  children,
  ...props
}) => (
  <div className={`bg-white p-6 rounded-lg shadow-md ${className}`} {...props}>
    {children}
  </div>
);
