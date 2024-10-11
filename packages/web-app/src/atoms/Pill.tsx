import React from "react";

export const Pill = ({
  children,
  label = "",
  textColor = "white",
  bgColor = "primary",
  className = "",
}: {
  children?: React.ReactElement;
  label?: string;
  textColor?: string;
  bgColor?: string;
  className?: string;
}) => {
  return (
    <div
      className={`rounded-full bg-${bgColor} text-${textColor} px-2 py-1 text-xs ${className}`}
    >
      {label}
      {children}
    </div>
  );
};
