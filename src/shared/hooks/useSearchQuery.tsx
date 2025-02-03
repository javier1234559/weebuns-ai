import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface UseSearchQueryReturn {
  queries: Record<string, string>;
  updateQuery: (updates: Record<string, string | null>) => void;
  removeQuery: (keys: string[]) => void;
}

const useSearchQuery = (): UseSearchQueryReturn => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Convert URLSearchParams to a regular object
  const queries = useMemo(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  const updateQuery = useCallback(
    (updates: Record<string, string | null>) => {
      const current = new URLSearchParams(searchParams.toString());

      // Update or remove query parameters
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      });

      // Create the new URL
      const search = current.toString();
      const query = search ? `?${search}` : "";

      // Update the URL
      router.push(`${pathname}${query}`);
    },
    [searchParams, pathname, router]
  );

  // Function to remove multiple query parameters
  const removeQuery = useCallback(
    (keys: string[]) => {
      const current = new URLSearchParams(searchParams.toString());

      keys.forEach((key) => {
        current.delete(key);
      });

      const search = current.toString();
      const query = search ? `?${search}` : "";

      router.push(`${pathname}${query}`);
    },
    [searchParams, pathname, router]
  );

  return {
    queries,
    updateQuery,
    removeQuery,
  };
};

export default useSearchQuery;
