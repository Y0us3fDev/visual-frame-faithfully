import {
  Activity, BedDouble, Bell, Building2, CalendarDays, ClipboardList, FlaskConical, LayoutDashboard, Pill, ScanLine,
  Settings, Stethoscope, UserCog, Users, Wallet, BarChart3, type LucideIcon,
} from "lucide-react";

export interface NavItem {
  to: string;
  ar: string;
  en: string;
  icon: LucideIcon;
}
export interface NavGroup {
  ar: string;
  en: string;
  items: NavItem[];
}

export const NAV: NavGroup[] = [
  { ar: "الرئيسية", en: "Overview", items: [{ to: "/", ar: "لوحة التحكم", en: "Dashboard", icon: LayoutDashboard }] },
  {
    ar: "الرعاية الطبية",
    en: "Clinical",
    items: [
      { to: "/patients", ar: "المرضى", en: "Patients", icon: Users },
      { to: "/doctors", ar: "الأطباء", en: "Doctors", icon: Stethoscope },
      { to: "/appointments", ar: "المواعيد", en: "Appointments", icon: CalendarDays },
      { to: "/departments", ar: "الأقسام", en: "Departments", icon: Building2 },
      { to: "/rooms", ar: "الغرف والأسرّة", en: "Rooms & Beds", icon: BedDouble },
    ],
  },
  {
    ar: "الخدمات الطبية",
    en: "Services",
    items: [
      { to: "/pharmacy", ar: "الصيدلية", en: "Pharmacy", icon: Pill },
      { to: "/laboratory", ar: "المعمل", en: "Laboratory", icon: FlaskConical },
      { to: "/radiology", ar: "الأشعة", en: "Radiology", icon: ScanLine },
    ],
  },
  {
    ar: "الإدارة",
    en: "Administration",
    items: [
      { to: "/employees", ar: "الموظفون", en: "Employees", icon: UserCog },
      { to: "/hr", ar: "الحضور والموارد البشرية", en: "HR & Attendance", icon: ClipboardList },
      { to: "/finance", ar: "المالية", en: "Finance", icon: Wallet },
      { to: "/reports", ar: "التقارير والتحليلات", en: "Reports", icon: BarChart3 },
    ],
  },
  {
    ar: "النظام",
    en: "System",
    items: [
      { to: "/notifications", ar: "الإشعارات", en: "Notifications", icon: Bell },
      { to: "/settings", ar: "الإعدادات", en: "Settings", icon: Settings },
    ],
  },
];

export const ALL_NAV = NAV.flatMap((g) => g.items);
export const BRAND_ICON = Activity;
