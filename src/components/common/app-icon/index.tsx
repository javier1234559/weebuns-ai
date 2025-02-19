import { cn } from "@/lib/utils";
import React, { SVGProps } from "react";

interface IAppIconProps extends SVGProps<SVGSVGElement> {
  icon: string;
  size?: number;
}

function AppIcon(props: IAppIconProps) {
  const {
    icon,
    className = "",
    size = 16,
    viewBox = "0 0 24 24",
    ...rest
  } = props;

  const iconPath = `/svg/${icon}.svg#${icon}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      className={cn("pointer-events-none duration-300", className)}
      {...rest}
    >
      <use href={iconPath} width="100%" height="100%" />
    </svg>
  );
}

export default AppIcon;
