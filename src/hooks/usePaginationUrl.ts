"use client";

import debounce from "lodash/debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;

interface PaginationParams {
  defaultPage?: number;
  defaultPerPage?: number;
  debounceDelay?: number;
}

const usePaginationUrl = ({
  defaultPage = DEFAULT_PAGE,
  defaultPerPage = DEFAULT_PAGE_SIZE,
  debounceDelay = 1500,
}: PaginationParams = {}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState<number>(defaultPage);
  const [perPage, setPerPage] = useState<number>(defaultPerPage);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchParam, setSearchParam] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [lessonType, setLessonType] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [topic, setTopic] = useState<string>("");

  const updateParams = useCallback(
    (newParams: {
      page?: number;
      perPage?: number;
      search?: string;
      tags?: string[];
      lessonType?: string | undefined;
      level?: string | undefined;
      topic?: string | undefined;
    }) => {
      const urlParams = new URLSearchParams(searchParams.toString());

      // Xử lý các param động
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          urlParams.delete(key);
        } else if (value !== null) {
          urlParams.set(key, value.toString());
        }
      });

      router.push(`?${urlParams.toString()}`);
    },
    [searchParams, router],
  );

  const debouncedUpdateParams = useMemo(
    () =>
      debounce((value: string) => {
        updateParams({ search: value });
        setSearchParam(value.trim()); // Update searchParam only when debounced
      }, debounceDelay),
    [updateParams, debounceDelay],
  );

  // Parse tags from comma-separated string
  const parseTagsFromString = useCallback(
    (tagsString: string | null): string[] => {
      if (!tagsString) return [];
      return tagsString
        .split(",")
        .filter(Boolean)
        .map((tag) => tag.toLowerCase());
    },
    [],
  );

  // Reset when location changes (e.g., from filters)
  useEffect(() => {
    const pageParam = searchParams.get("page");
    const perPageParam = searchParams.get("perPage");
    const searchParam = searchParams.get("search");
    const tagsParam = searchParams.get("tags");
    const lessonTypeParam = searchParams.get("lessonType");
    const levelParam = searchParams.get("level");
    const topicParam = searchParams.get("topic");

    // Set page
    setPage(pageParam ? Number(pageParam) : defaultPage);
    setPerPage(perPageParam ? Number(perPageParam) : defaultPerPage);

    // Handle search params
    setSearchValue(searchParam || "");
    setSearchParam(searchParam || "");

    // Handle tags
    setTags(parseTagsFromString(tagsParam));

    // Reset state khi param bị xóa
    setLessonType(lessonTypeParam || "");
    setLevel(levelParam || "");
    setTopic(topicParam || "");
  }, [searchParams, parseTagsFromString, defaultPage, defaultPerPage]);

  useEffect(() => {
    return () => {
      debouncedUpdateParams.cancel();
    };
  }, [debouncedUpdateParams]);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchValue(value); // Update UI immediately
      debouncedUpdateParams(value); // Debounce URL update and API param
    },
    [debouncedUpdateParams],
  );

  // Add convenience method for updating tags
  const updateTags = useCallback(
    (newTags: string[]) => {
      updateParams({
        tags: newTags,
        page: 1, // Reset to first page when changing tags
      });
    },
    [updateParams],
  );

  // Add tag
  const addTag = useCallback(
    (tag: string) => {
      if (!tags.includes(tag.toLowerCase())) {
        const newTags = [...tags, tag.toLowerCase()];
        updateTags(newTags);
      }
    },
    [tags, updateTags],
  );

  // Remove tag
  const removeTag = useCallback(
    (tag: string) => {
      const newTags = tags.filter((t) => t !== tag.toLowerCase());
      updateTags(newTags);
    },
    [tags, updateTags],
  );

  // Toggle tag
  const toggleTag = useCallback(
    (tag: string) => {
      const lowercaseTag = tag.toLowerCase();
      const newTags = tags.includes(lowercaseTag)
        ? tags.filter((t) => t !== lowercaseTag)
        : [...tags, lowercaseTag];
      updateTags(newTags);
    },
    [tags, updateTags],
  );

  return {
    page,
    perPage,
    search: searchValue, // For UI input
    searchParam, // For API calls - only has value when needed
    tags, // Current active tags
    lessonType,
    level,
    topic,
    setSearch: handleSearch,
    updateQueryParams: updateParams,
    updateTags,
    addTag,
    removeTag,
    toggleTag,
  };
};

export default usePaginationUrl;
