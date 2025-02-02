import { useRef, useEffect, useCallback } from "react";

export function useScrollToBottom<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const scrollToBottom = useCallback(() => {
    if (ref.current) {
      requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.scrollTop = ref.current.scrollHeight;
        }
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom(); // Ensure it scrolls to the bottom on mount
  }, [scrollToBottom]);

  return { ref, scrollToBottom };
}
