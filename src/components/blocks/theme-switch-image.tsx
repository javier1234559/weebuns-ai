"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

interface ThemeSwitchImageProps {
  lightSrc: string;
  darkSrc: string;
  alt: string;
}

export default function ThemeSwitchImage({ lightSrc, darkSrc, alt }: ThemeSwitchImageProps) {
  const { theme, resolvedTheme } = useTheme();

  const currentTheme = theme === 'system' ? resolvedTheme : theme;
  const imageSrc = currentTheme === 'dark' ? darkSrc : lightSrc;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      className="h-auto w-full object-cover"
      loading="lazy"
      decoding="async"
      width={1200}
      height={1200}
    />
  );
}
