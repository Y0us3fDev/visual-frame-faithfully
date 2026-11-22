import { Fragment } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useI18n } from "@/contexts/settings";
import { ALL_NAV } from "./nav";

export function Breadcrumbs() {
  const { lang, t, isRTL } = useI18n();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const segs = path.split("/").filter(Boolean);
  const Sep = isRTL ? ChevronLeft : ChevronRight;
  const crumbs: { label: string; to?: string | undefined }[] = [];
  if (segs[0]) {
    const nav = ALL_NAV.find((n) => n.to === `/${segs[0]}`);
    crumbs.push({ label: nav ? nav[lang] : segs[0], to: segs.length > 1 ? `/${segs[0]}` : undefined });
    if (segs[1]) crumbs.push({ label: t("التفاصيل", "Details") });
  }
  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Link to="/" className="inline-flex items-center gap-1.5 hover:text-foreground">
        <Home className="size-4" />
        {crumbs.length === 0 && <span className="font-medium text-foreground">{t("لوحة التحكم", "Dashboard")}</span>}
      </Link>
      {crumbs.map((c, i) => (
        <Fragment key={i}>
          <Sep className="size-3.5" />
          {c.to ? (
            <Link to={c.to} className="hover:text-foreground">
              {c.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground">{c.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
