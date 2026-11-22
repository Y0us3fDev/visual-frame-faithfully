import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Card surface with optional header row; the main content container across pages. */
export function Panel({ title, description, action, children, className, bodyClassName }: { title?: string; description?: string; action?: ReactNode; children: ReactNode; className?: string; bodyClassName?: string }) {
  return (
    <section className={cn("surface overflow-hidden", className)}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-3 border-b px-5 py-4">
          <div>
            {title && <h2 className="font-semibold text-foreground">{title}</h2>}
            {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

export function InfoRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-end font-medium text-foreground">{value}</span>
    </div>
  );
}
