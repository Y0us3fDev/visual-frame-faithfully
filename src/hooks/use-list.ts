import { useEffect, useMemo, useState } from "react";

interface Options<T> {
  search: (item: T) => string;
  filters?: Record<string, (item: T) => string>;
  pageSize?: number;
  sort?: (a: T, b: T) => number;
}

/** Search + filter + pagination state for any list. Filter value "all" disables a filter. */
export function useListControls<T>(items: T[], opts: Options<T>) {
  const [query, setQuery] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const pageSize = opts.pageSize ?? 10;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = items.filter((it) => {
      if (q && !opts.search(it).toLowerCase().includes(q)) return false;
      for (const [k, fn] of Object.entries(opts.filters ?? {})) {
        const v = filterValues[k];
        if (v && v !== "all" && fn(it) !== v) return false;
      }
      return true;
    });
    if (opts.sort) out = [...out].sort(opts.sort);
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, query, filterValues]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);
  useEffect(() => {
    setPage(1);
  }, [query, filterValues]);

  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);
  return {
    query,
    setQuery,
    filter: (k: string) => filterValues[k] ?? "all",
    setFilter: (k: string, v: string) => setFilterValues((s) => ({ ...s, [k]: v })),
    clearFilters: () => {
      setFilterValues({});
      setQuery("");
    },
    page,
    setPage,
    pageCount,
    pageSize,
    pageItems,
    filtered,
    total: filtered.length,
  };
}
export type ListControls<T> = ReturnType<typeof useListControls<T>>;
