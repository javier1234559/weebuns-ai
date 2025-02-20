"use client";

import { useState, useEffect } from "react";

const THRESHOLD = 10;

interface UseScrollProps {
  threshold?: number;
}

export default function useScroll({ threshold = THRESHOLD }: UseScrollProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}
