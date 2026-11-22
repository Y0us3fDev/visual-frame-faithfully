import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useI18n } from "@/contexts/settings";

export function RowActions({ onView, onEdit, onDelete, extra }: { onView?: () => void; onEdit?: () => void; onDelete?: () => void; extra?: ReactNode }) {
  const { t } = useI18n();
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8" aria-label={t("إجراءات", "Actions")}>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          {onView && (
            <DropdownMenuItem onClick={onView}>
              <Eye /> {t("عرض التفاصيل", "View details")}
            </DropdownMenuItem>
          )}
          {onEdit && (
            <DropdownMenuItem onClick={onEdit}>
              <Pencil /> {t("تعديل", "Edit")}
            </DropdownMenuItem>
          )}
          {extra}
          {onDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
                <Trash2 /> {t("حذف", "Delete")}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
