import { useMemo } from "react";
import Fuse from "fuse.js";
import type { IFuseOptions } from "fuse.js";
import { useDebounce } from "./useDebounce";

export function useSearch<T>(
  data: T[] | undefined,
  searchTerm: string,
  fuseOptions: IFuseOptions<T>
) {
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fuse = useMemo(() => {
    if (!data || !Array.isArray(data)) return undefined;
    return new Fuse(data, fuseOptions);
  }, [data, fuseOptions]);

  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    if (!debouncedSearchTerm.trim()) {
      return data;
    }
    return fuse
      ? fuse.search(debouncedSearchTerm).map((result) => result.item)
      : data;
  }, [fuse, debouncedSearchTerm, data]);

  return filteredData;
}
