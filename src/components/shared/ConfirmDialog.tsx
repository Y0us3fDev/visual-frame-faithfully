import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/contexts/settings";
import { AlertTriangle } from "lucide-react";

export function ConfirmDialog({
  open, onOpenChange, title, description, onConfirm, confirmLabel, destructive = true,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  description?: string;
  onConfirm: () => void;
  confirmLabel?: string;
  destructive?: boolean;
}) {
  const { t } = useI18n();
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader className="sm:text-start">
          <div className={destructive ? "mb-2 grid size-11 place-items-center rounded-full bg-danger-soft text-destructive" : "mb-2 grid size-11 place-items-center rounded-full bg-primary-soft text-primary"}>
            <AlertTriangle className="size-5" />
          </div>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:justify-start">
          <AlertDialogAction
            className={buttonVariants({ variant: destructive ? "destructive" : "default" })}
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {confirmLabel ?? t("تأكيد الحذف", "Delete")}
          </AlertDialogAction>
          <AlertDialogCancel>{t("إلغاء", "Cancel")}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
