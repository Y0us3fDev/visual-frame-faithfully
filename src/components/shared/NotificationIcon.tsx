import { AlertTriangle, CalendarPlus, CreditCard, Package, UserPlus, CalendarOff } from "lucide-react";
import type { NotificationType } from "@/types";
import { cn } from "@/lib/utils";

const map: Record<NotificationType, { icon: typeof Package; cls: string }> = {
  appointment: { icon: CalendarPlus, cls: "bg-primary-soft text-primary" },
  patient: { icon: UserPlus, cls: "bg-info-soft text-info" },
  stock: { icon: Package, cls: "bg-warning-soft text-warning-foreground dark:text-warning" },
  payment: { icon: CreditCard, cls: "bg-success-soft text-success" },
  leave: { icon: CalendarOff, cls: "bg-muted text-muted-foreground" },
  system: { icon: AlertTriangle, cls: "bg-danger-soft text-destructive" },
};

export function NotificationIcon({ type, className }: { type: NotificationType; className?: string }) {
  const m = map[type];
  return (
    <div className={cn("grid size-9 shrink-0 place-items-center rounded-lg", m.cls, className)}>
      <m.icon className="size-4" />
    </div>
  );
}
