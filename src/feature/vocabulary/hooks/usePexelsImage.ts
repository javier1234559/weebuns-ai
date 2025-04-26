import { useState, useCallback } from "react";
import debounce from "lodash/debounce";

export function usePexelsImage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const searchImage = useCallback(
    debounce(async (query: string) => {
      if (!query) return null;

      const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
      if (!apiKey) {
        setError("Pexels API key is not configured");
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(
            query,
          )}&per_page=1`,
          {
            headers: {
              Authorization: apiKey,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }

        const data = await response.json();
        const url = data.photos[0]?.src?.medium || null;
        setImageUrl(url);
        return url;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch image");
        return null;
      } finally {
        setIsLoading(false);
      }
    }, 500),
    [],
  );

  return { searchImage, isLoading, error, imageUrl };
}
