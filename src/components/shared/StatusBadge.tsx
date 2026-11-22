import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/contexts/settings";
import type { LabelMap } from "@/data/labels";

export function StatusBadge({ map, value, dot = true }: { map: LabelMap; value: string; dot?: boolean }) {
  const { lang } = useI18n();
  const l = map[value];
  if (!l) return <Badge variant="muted">{value}</Badge>;
  return (
    <Badge variant={l.tone ?? "muted"}>
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {l[lang]}
    </Badge>
  );
}

export function useLabel() {
  const { lang } = useI18n();
  return (map: LabelMap, value: string) => map[value]?.[lang] ?? value;
}
