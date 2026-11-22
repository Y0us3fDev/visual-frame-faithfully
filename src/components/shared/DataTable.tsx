import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/contexts/settings";
import { useDataHydrated } from "@/data/store";
import { formatNumber } from "@/utils/format";
import { cn } from "@/lib/utils";
import { EmptyState } from "./EmptyState";
import type { ListControls } from "@/hooks/use-list";

export interface Column<T> {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
}

export function DataTable<T extends { id: string }>({
  columns, rows, onRowClick, empty, list,
}: {
  columns: Column<T>[];
  rows: T[];
  onRowClick?: (row: T) => void;
  empty?: ReactNode;
  list?: ListControls<T>;
}) {
  const { t } = useI18n();
  const hydrated = useDataHydrated();
  return (
    <div>
      <div className="overflow-x-auto scrollbar-thin">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              {columns.map((c) => (
                <TableHead key={c.key} className={cn("h-11 px-4 text-xs font-semibold uppercase tracking-wide whitespace-nowrap", c.className)}>
                  {c.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {!hydrated
              ? Array.from({ length: 6 }, (_, i) => (
                  <TableRow key={i}>
                    {columns.map((c) => (
                      <TableCell key={c.key} className="px-4 py-3">
                        <Skeleton className="h-5 w-full max-w-36" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={cn(onRowClick && "cursor-pointer")}
                  >
                    {columns.map((c) => (
                      <TableCell key={c.key} className={cn("px-4 py-3", c.className)}>
                        {c.cell(row)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        {hydrated && rows.length === 0 &&
          (empty ?? (
            <EmptyState
              icon={SearchX}
              title={t("لا توجد نتائج", "No results found")}
              description={t("جرّب تغيير كلمات البحث أو عوامل التصفية.", "Try adjusting your search or filters.")}
              action={list ? <Button variant="outline" size="sm" onClick={list.clearFilters}>{t("مسح التصفية", "Clear filters")}</Button> : undefined}
            />
          ))}
      </div>
      {list && <TablePagination list={list} />}
    </div>
  );
}

export function TablePagination<T>({ list }: { list: ListControls<T> }) {
  const { t, lang } = useI18n();
  if (list.total === 0) return null;
  const from = (list.page - 1) * list.pageSize + 1;
  const to = Math.min(list.page * list.pageSize, list.total);
  const pages = Array.from({ length: list.pageCount }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === list.pageCount || Math.abs(p - list.page) <= 1,
  );
  return (
    <div className="no-print flex flex-col items-center justify-between gap-3 border-t px-4 py-3 sm:flex-row">
      <p className="text-sm text-muted-foreground">
        {t(
          `عرض ${formatNumber(from, lang)}–${formatNumber(to, lang)} من ${formatNumber(list.total, lang)}`,
          `Showing ${from}–${to} of ${list.total}`,
        )}
      </p>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon" className="size-8" disabled={list.page === 1} onClick={() => list.setPage(list.page - 1)} aria-label={t("السابق", "Previous")}>
          <ChevronLeft className="rtl:rotate-180" />
        </Button>
        {pages.map((p, i) => (
          <span key={p} className="flex items-center gap-1">
            {i > 0 && p - (pages[i - 1] ?? p) > 1 && <span className="px-1 text-muted-foreground">…</span>}
            <Button variant={p === list.page ? "default" : "ghost"} size="icon" className="size-8" onClick={() => list.setPage(p)}>
              {formatNumber(p, lang)}
            </Button>
          </span>
        ))}
        <Button variant="outline" size="icon" className="size-8" disabled={list.page === list.pageCount} onClick={() => list.setPage(list.page + 1)} aria-label={t("التالي", "Next")}>
          <ChevronRight className="rtl:rotate-180" />
        </Button>
      </div>
    </div>
  );
}
