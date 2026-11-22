import type { Lang } from "@/types";
import { parseISODate } from "./date";

const locale = (lang: Lang) => (lang === "ar" ? "ar-EG" : "en-US");

export function formatMoney(value: number, lang: Lang): string {
  const n = new Intl.NumberFormat(locale(lang), { maximumFractionDigits: 0 }).format(Math.round(value));
  return lang === "ar" ? `${n} ج.م` : `EGP ${n}`;
}
export function formatCompactMoney(value: number, lang: Lang): string {
  const n = new Intl.NumberFormat(locale(lang), { notation: "compact", maximumFractionDigits: 1 }).format(value);
  return lang === "ar" ? `${n} ج.م` : `EGP ${n}`;
}
export function formatNumber(value: number, lang: Lang): string {
  return new Intl.NumberFormat(locale(lang)).format(value);
}
export function formatDate(value: string, lang: Lang, opts?: Intl.DateTimeFormatOptions): string {
  if (!value) return "—";
  const d = value.length <= 10 ? parseISODate(value) : new Date(value);
  return new Intl.DateTimeFormat(locale(lang), opts ?? { day: "numeric", month: "short", year: "numeric" }).format(d);
}
export function formatDateTime(value: string, lang: Lang): string {
  return new Intl.DateTimeFormat(locale(lang), {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}
export function formatTime(hhmm: string | undefined, lang: Lang): string {
  if (!hhmm) return "—";
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(2000, 0, 1, h ?? 0, m ?? 0);
  return new Intl.DateTimeFormat(locale(lang), { hour: "numeric", minute: "2-digit" }).format(d);
}
export function timeAgo(iso: string, lang: Lang): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(locale(lang), { numeric: "auto" });
  if (diff < 60) return rtf.format(-Math.round(diff), "second");
  if (diff < 3600) return rtf.format(-Math.round(diff / 60), "minute");
  if (diff < 86400) return rtf.format(-Math.round(diff / 3600), "hour");
  return rtf.format(-Math.round(diff / 86400), "day");
}
export function initials(name: string): string {
  return name
    .replace(/^(د\.|Dr\.)\s*/, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0] ?? "")
    .join("")
    .toUpperCase();
}
