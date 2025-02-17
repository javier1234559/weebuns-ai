"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import React, { useEffect, useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export const Reveal = ({
  children,
  width = "fit-content",
  delay = 0.25,
  duration = 0.5,
  direction = "up",
  className = "",
}: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  const getDirectionalVariants = () => {
    const distance = 50; // Distance to move in pixels

    const variants = {
      up: { y: distance, x: 0 },
      down: { y: -distance, x: 0 },
      left: { x: distance, y: 0 },
      right: { x: -distance, y: 0 },
    };

    return {
      hidden: {
        opacity: 0,
        ...variants[direction],
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
      },
    };
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div ref={ref} style={{ width }} className={className}>
      <motion.div
        variants={getDirectionalVariants()}
        initial="hidden"
        animate={controls}
        transition={{
          duration: duration,
          delay: delay,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
