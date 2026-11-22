import { cn } from "@/lib/utils";
import { initials } from "@/utils/format";

const tones = [
  "bg-primary-soft text-primary",
  "bg-success-soft text-success",
  "bg-warning-soft text-warning-foreground dark:text-warning",
  "bg-info-soft text-info",
  "bg-danger-soft text-destructive",
];

export function PersonAvatar({ name, className, size = "md" }: { name: string; className?: string; size?: "sm" | "md" | "lg" | "xl" }) {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const sizes = { sm: "size-8 text-xs", md: "size-10 text-sm", lg: "size-14 text-lg", xl: "size-20 text-2xl" };
  return (
    <div className={cn("grid shrink-0 place-items-center rounded-full font-semibold", sizes[size], tones[h % tones.length], className)}>
      {initials(name)}
    </div>
  );
}

export function PersonCell({ name, sub, size = "sm" }: { name: string; sub?: string; size?: "sm" | "md" }) {
  return (
    <div className="flex items-center gap-3">
      <PersonAvatar name={name} size={size} />
      <div className="min-w-0">
        <p className="truncate font-medium text-foreground">{name}</p>
        {sub && <p className="truncate text-xs text-muted-foreground">{sub}</p>}
      </div>
    </div>
  );
}
