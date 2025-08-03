import { useMemo } from "react";
import Fuse from "fuse.js";
import type { IFuseOptions } from "fuse.js";
import { useDebounce } from "./useDebounce";

export function useSearch<T>(
  data: T[],
  searchTerm: string,
  fuseOptions: IFuseOptions<T>
) {
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fuse = useMemo(() => {
    return new Fuse(data, fuseOptions);
  }, [data, fuseOptions]);

  const filteredData = useMemo(() => {
    return debouncedSearchTerm.trim()
      ? fuse.search(debouncedSearchTerm).map((result) => result.item)
      : data;
  }, [fuse, debouncedSearchTerm, data]);

  return filteredData;
}
