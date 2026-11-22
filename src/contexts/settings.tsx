import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from "react";
import { createPersistentStore, useStoreSelector } from "@/data/persistent";
import { dataStore } from "@/data/store";
import type { Lang, Txt } from "@/types";

export interface Settings {
  lang: Lang;
  theme: "light" | "dark";
  hospital: {
    nameAr: string;
    nameEn: string;
    phone: string;
    email: string;
    address: string;
    license: string;
    taxId: string;
  };
  user: { name: string; email: string; phone: string; role: string };
  notifications: Record<"appointment" | "patient" | "stock" | "payment" | "leave" | "system" | "email" | "sound", boolean>;
  general: { dateFormat: "short" | "long"; weekStart: 0 | 6; sessionTimeout: number; compactTables: boolean };
}

export const defaultSettings = (): Settings => ({
  lang: "ar",
  theme: "light",
  hospital: {
    nameAr: "مستشفى الشفاء التخصصي",
    nameEn: "Al Shifa Hospital",
    phone: "+20 2 2345 6789",
    email: "info@alshifa-hospital.eg",
    address: "15 شارع التحرير، الدقي، الجيزة",
    license: "MOH-2019-04512",
    taxId: "512-334-890",
  },
  user: { name: "د. أحمد منصور", email: "a.mansour@alshifa-hospital.eg", phone: "+20 100 234 5678", role: "admin" },
  notifications: { appointment: true, patient: true, stock: true, payment: true, leave: true, system: true, email: false, sound: true },
  general: { dateFormat: "short", weekStart: 6, sessionTimeout: 30, compactTables: false },
});

export const settingsStore = createPersistentStore<Settings>("alshifa:settings:v1", defaultSettings);

export const SETTINGS_BOOT_SCRIPT = `try{var s=JSON.parse(localStorage.getItem("alshifa:settings:v1")||"{}");var l=s.lang||"ar";document.documentElement.lang=l;document.documentElement.dir=l==="ar"?"rtl":"ltr";if(s.theme==="dark")document.documentElement.classList.add("dark")}catch(e){}`;

interface I18nCtx {
  lang: Lang;
  dir: "rtl" | "ltr";
  isRTL: boolean;
  /** Pick the Arabic or English string. */
  t: (ar: string, en: string) => string;
  /** Resolve stored bilingual-or-plain text. */
  tx: (v: Txt | undefined) => string;
}
const Ctx = createContext<I18nCtx | null>(null);

export function useSettings() {
  return useStoreSelector(settingsStore, (s) => s);
}
export function updateSettings(patch: Partial<Settings> | ((s: Settings) => Settings)) {
  settingsStore.set((s) => (typeof patch === "function" ? patch(s) : { ...s, ...patch }));
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const lang = useStoreSelector(settingsStore, (s) => s.lang);
  const theme = useStoreSelector(settingsStore, (s) => s.theme);

  useEffect(() => {
    settingsStore.hydrate();
    dataStore.hydrate();
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const t = useCallback((ar: string, en: string) => (lang === "ar" ? ar : en), [lang]);
  const tx = useCallback(
    (v: Txt | undefined) => (v == null ? "" : typeof v === "string" ? v : lang === "ar" ? v.ar : v.en),
    [lang],
  );
  const value = useMemo<I18nCtx>(
    () => ({ lang, dir: lang === "ar" ? "rtl" : "ltr", isRTL: lang === "ar", t, tx }),
    [lang, t, tx],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n(): I18nCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useI18n must be used inside SettingsProvider");
  return c;
}

/** Plain-text form of a Txt for searching across both languages. */
export function txtSearch(v: Txt | undefined): string {
  if (!v) return "";
  return (typeof v === "string" ? v : `${v.ar} ${v.en}`).toLowerCase();
}
