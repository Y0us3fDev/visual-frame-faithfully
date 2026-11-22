import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type StatTone = "primary" | "success" | "warning" | "danger" | "info";
const toneClass: Record<StatTone, string> = {
  primary: "bg-primary-soft text-primary",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning-foreground dark:text-warning",
  danger: "bg-danger-soft text-destructive",
  info: "bg-info-soft text-info",
};

export function StatCard({
  label, value, icon: Icon, tone = "primary", trend, hint, index = 0,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  tone?: StatTone;
  trend?: number;
  hint?: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="surface group relative overflow-hidden p-5 transition-shadow hover:shadow-elevated"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 truncate text-2xl font-bold tracking-tight text-foreground">{value}</p>
        </div>
        <div className={cn("grid size-11 shrink-0 place-items-center rounded-xl", toneClass[tone])}>
          <Icon className="size-5" />
        </div>
      </div>
      {(trend !== undefined || hint) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          {trend !== undefined && (
            <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium", trend >= 0 ? "bg-success-soft text-success" : "bg-danger-soft text-destructive")}>
              {trend >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
              {Math.abs(trend)}%
            </span>
          )}
          {hint && <span className="text-muted-foreground">{hint}</span>}
        </div>
      )}
    </motion.div>
  );
}
