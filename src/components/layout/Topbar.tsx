import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, CheckCheck, Languages, LogOut, Moon, Search, Settings, Sun, User } from "lucide-react";
import { toast } from "sonner";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { updateSettings, useI18n, useSettings, txtSearch } from "@/contexts/settings";
import { useCollection } from "@/data/store";

import { PersonAvatar } from "@/components/shared/PersonAvatar";
import { formatNumber, timeAgo } from "@/utils/format";
import { cn } from "@/lib/utils";
import { ALL_NAV } from "./nav";
import { Breadcrumbs } from "./Breadcrumbs";
import { NotificationIcon } from "@/components/shared/NotificationIcon";

export function Topbar() {
  const { t, tx, lang } = useI18n();
  const settings = useSettings();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const { items: notifications, update } = useCollection("notifications");
  const unread = notifications.filter((n) => !n.read);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="no-print sticky top-0 z-30 border-b bg-background/85 backdrop-blur-md">
      <div className="flex h-16 items-center gap-3 px-4 md:px-6">
        <SidebarTrigger className="shrink-0" />
        <div className="hidden min-w-0 md:block">
          <Breadcrumbs />
        </div>
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="flex h-9 w-full max-w-72 items-center gap-2 rounded-lg border bg-card px-3 text-sm text-muted-foreground transition-colors hover:border-primary/40"
        >
          <Search className="size-4" />
          <span className="flex-1 truncate text-start">{t("ابحث عن مريض، طبيب، دواء...", "Search patients, doctors, medicines...")}</span>
          <kbd className="hidden rounded border bg-muted px-1.5 text-[10px] font-medium sm:inline" dir="ltr">Ctrl K</kbd>
        </button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => updateSettings({ lang: lang === "ar" ? "en" : "ar" })}
          aria-label={t("تغيير اللغة", "Change language")}
          title={lang === "ar" ? "English" : "العربية"}
        >
          <Languages />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => updateSettings({ theme: settings.theme === "dark" ? "light" : "dark" })}
          aria-label={t("تغيير المظهر", "Toggle theme")}
        >
          {settings.theme === "dark" ? <Sun /> : <Moon />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative" aria-label={t("الإشعارات", "Notifications")}>
              <Bell />
              {unread.length > 0 && (
                <span className="absolute -top-0.5 end-0 grid min-w-4 place-items-center rounded-full bg-destructive px-1 text-[10px] font-bold leading-4 text-destructive-foreground">
                  {formatNumber(unread.length, lang)}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <p className="font-semibold">{t("الإشعارات", "Notifications")}</p>
              {unread.length > 0 && (
                <button
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  onClick={() => {
                    unread.forEach((n) => update(n.id, { read: true }));
                    toast.success(t("تم تعليم الكل كمقروء", "All marked as read"));
                  }}
                >
                  <CheckCheck className="size-3.5" /> {t("تعليم الكل كمقروء", "Mark all read")}
                </button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto scrollbar-thin">
              {notifications.slice(0, 6).map((n) => (
                <DropdownMenuItem
                  key={n.id}
                  className="items-start gap-3 rounded-none border-b px-4 py-3 last:border-0"
                  onClick={() => update(n.id, { read: true })}
                >
                  <NotificationIcon type={n.type} />
                  <div className="min-w-0 flex-1">
                    <p className={cn("text-sm", !n.read && "font-semibold")}>{tx(n.title)}</p>
                    <p className="line-clamp-2 text-xs text-muted-foreground">{tx(n.message)}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{timeAgo(n.createdAt, lang)}</p>
                  </div>
                  {!n.read && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />}
                </DropdownMenuItem>
              ))}
            </div>
            <div className="border-t p-2">
              <Button variant="ghost" className="w-full" asChild>
                <Link to="/notifications">{t("عرض كل الإشعارات", "View all notifications")}</Link>
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-muted" aria-label={t("الملف الشخصي", "Profile")}>
              <PersonAvatar name={settings.user.name} size="sm" />
              <div className="hidden text-start leading-tight lg:block">
                <p className="text-sm font-semibold">{settings.user.name}</p>
                <p className="text-xs text-muted-foreground">{t("مدير النظام", "System admin")}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p>{settings.user.name}</p>
              <p className="text-xs font-normal text-muted-foreground">{settings.user.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate({ to: "/settings", search: { tab: "profile" } })}>
              <User /> {t("الملف الشخصي", "My profile")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate({ to: "/settings", search: { tab: undefined } })}>
              <Settings /> {t("الإعدادات", "Settings")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => toast.info(t("هذه نسخة تجريبية — تسجيل الخروج غير مفعّل", "Demo mode — sign out is disabled"))}
            >
              <LogOut /> {t("تسجيل الخروج", "Sign out")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}

function GlobalSearch({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { t, tx, lang } = useI18n();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const { items: patients } = useCollection("patients");
  const { items: doctors } = useCollection("doctors");
  const { items: employees } = useCollection("employees");
  const { items: medicines } = useCollection("medicines");
  const ql = q.trim().toLowerCase();
  const match = (s: string) => !ql || s.includes(ql);
  const go = (fn: () => void) => {
    onOpenChange(false);
    setQ("");
    fn();
  };
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput value={q} onValueChange={setQ} placeholder={t("اكتب للبحث...", "Type to search...")} />
      <CommandList>
        <CommandEmpty>{t("لا توجد نتائج", "No results")}</CommandEmpty>
        <CommandGroup heading={t("الصفحات", "Pages")}>
          {ALL_NAV.filter((n) => match(`${n.ar} ${n.en}`.toLowerCase())).map((n) => (
            <CommandItem key={n.to} value={`page ${n.ar} ${n.en}`} onSelect={() => go(() => navigate({ to: n.to }))}>
              <n.icon /> {n[lang]}
            </CommandItem>
          ))}
        </CommandGroup>
        {ql && (
          <>
            <CommandGroup heading={t("المرضى", "Patients")}>
              {patients.filter((p) => match(`${txtSearch(p.name)} ${p.phone} ${p.id}`)).slice(0, 5).map((p) => (
                <CommandItem key={p.id} value={`p ${txtSearch(p.name)} ${p.phone} ${p.id}`} onSelect={() => go(() => navigate({ to: "/patients/$id", params: { id: p.id } }))}>
                  <PersonAvatar name={tx(p.name)} size="sm" className="size-6 text-[10px]" /> {tx(p.name)}
                  <span className="ms-auto text-xs text-muted-foreground" dir="ltr">{p.phone}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading={t("الأطباء", "Doctors")}>
              {doctors.filter((d) => match(`${txtSearch(d.name)} ${txtSearch(d.specialty)}`)).slice(0, 5).map((d) => (
                <CommandItem key={d.id} value={`d ${txtSearch(d.name)} ${txtSearch(d.specialty)}`} onSelect={() => go(() => navigate({ to: "/doctors/$id", params: { id: d.id } }))}>
                  <PersonAvatar name={tx(d.name)} size="sm" className="size-6 text-[10px]" /> {tx(d.name)}
                  <span className="ms-auto text-xs text-muted-foreground">{tx(d.specialty)}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading={t("الموظفون", "Employees")}>
              {employees.filter((e) => match(`${txtSearch(e.name)} ${txtSearch(e.jobTitle)}`)).slice(0, 4).map((e) => (
                <CommandItem key={e.id} value={`e ${txtSearch(e.name)} ${txtSearch(e.jobTitle)}`} onSelect={() => go(() => navigate({ to: "/employees/$id", params: { id: e.id } }))}>
                  <PersonAvatar name={tx(e.name)} size="sm" className="size-6 text-[10px]" /> {tx(e.name)}
                  <span className="ms-auto text-xs text-muted-foreground">{tx(e.jobTitle)}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading={t("الأدوية", "Medicines")}>
              {medicines.filter((m) => match(`${m.name} ${m.generic}`.toLowerCase())).slice(0, 4).map((m) => (
                <CommandItem key={m.id} value={`m ${m.name} ${m.generic}`.toLowerCase()} onSelect={() => go(() => navigate({ to: "/pharmacy" }))}>
                  {m.name}
                  <span className="ms-auto text-xs text-muted-foreground">{formatNumber(m.stock, lang)} {t("وحدة", "units")}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}

