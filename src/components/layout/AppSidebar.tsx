import { Link, useRouterState } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader,
  SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { useI18n, useSettings } from "@/contexts/settings";
import { useCollection } from "@/data/store";
import { formatNumber } from "@/utils/format";
import { BRAND_ICON as Brand, NAV } from "./nav";

export function AppSidebar() {
  const { lang, isRTL, t } = useI18n();
  const settings = useSettings();
  const { state, setOpenMobile, isMobile } = useSidebar();
  const collapsed = state === "collapsed" && !isMobile;
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { items: notifications } = useCollection("notifications");
  const unread = notifications.filter((n) => !n.read).length;
  const isActive = (to: string) => (to === "/" ? path === "/" : path === to || path.startsWith(`${to}/`));

  return (
    <Sidebar collapsible="icon" side={isRTL ? "right" : "left"} className="border-sidebar-border">
      <SidebarHeader className="px-3 py-4">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpenMobile(false)}>
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elevated">
            <Brand className="size-5" />
          </div>
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <p className="truncate font-bold text-sidebar-accent-foreground">{lang === "ar" ? settings.hospital.nameAr : settings.hospital.nameEn}</p>
              <p className="truncate text-xs text-sidebar-foreground/70">{t("نظام إدارة المستشفى", "Hospital Management")}</p>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent className="scrollbar-thin">
        {NAV.map((group) => (
          <SidebarGroup key={group.en} className="py-1">
            <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
              {group[lang]}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.to)}
                      tooltip={item[lang]}
                      className="h-9 data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:shadow-elevated"
                    >
                      <Link to={item.to} onClick={() => setOpenMobile(false)}>
                        <item.icon />
                        <span>{item[lang]}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.to === "/notifications" && unread > 0 && (
                      <SidebarMenuBadge className="rounded-full bg-destructive text-destructive-foreground peer-data-[active=true]/menu-button:text-destructive-foreground">
                        {formatNumber(unread, lang)}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      {!collapsed && (
        <SidebarFooter className="p-3">
          <div className="relative overflow-hidden rounded-xl bg-sidebar-accent p-4">
            <div className="dot-grid absolute inset-0 opacity-40" />
            <p className="relative text-sm font-semibold text-sidebar-accent-foreground">{t("حجز سريع", "Quick booking")}</p>
            <p className="relative mt-1 text-xs text-sidebar-foreground/70">{t("أضف موعداً جديداً لمريض", "Add a new patient appointment")}</p>
            <Link
              to="/appointments"
              search={{ new: true }}
              onClick={() => setOpenMobile(false)}
              className="relative mt-3 inline-flex h-8 items-center gap-1.5 rounded-lg bg-sidebar-primary px-3 text-xs font-medium text-sidebar-primary-foreground hover:opacity-90"
            >
              <Plus className="size-3.5" />
              {t("موعد جديد", "New appointment")}
            </Link>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
