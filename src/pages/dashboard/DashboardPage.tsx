import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  BedDouble, BedSingle, CalendarCheck, CalendarPlus, Clock, CreditCard, Stethoscope, UserCog, UserPlus, Users, Wallet,
  ArrowLeft, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/shared/StatCard";
import { Panel } from "@/components/shared/Panel";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { PersonAvatar } from "@/components/shared/PersonAvatar";
import { NotificationIcon } from "@/components/shared/NotificationIcon";
import { DonutChart, GroupedBarChart, Legendary, MoneyAreaChart, CHART_COLORS } from "@/components/dashboard/charts";
import { useI18n, useSettings } from "@/contexts/settings";
import { useCollection } from "@/data/store";
import { appointmentStatus, appointmentType } from "@/data/labels";
import { monthlyFinance } from "@/data/seed";
import { departmentIconFor } from "@/data/icons";
import { useLookups } from "@/hooks/use-lookups";
import { formatCompactMoney, formatDate, formatMoney, formatNumber, formatTime, timeAgo } from "@/utils/format";
import { todayISO } from "@/utils/date";
import { invoiceBalance, invoiceTotal } from "@/utils/finance";

export function DashboardPage() {
  const { t, tx, lang, isRTL } = useI18n();
  const settings = useSettings();
  const L = useLookups();
  const { items: appointments } = useCollection("appointments");
  const { items: rooms } = useCollection("rooms");
  const { items: invoices } = useCollection("invoices");
  const { items: activities } = useCollection("activities");
  const today = todayISO();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const beds = rooms.flatMap((r) => r.beds);
  const availableBeds = beds.filter((b) => b.status === "available").length;
  const occupiedBeds = beds.filter((b) => b.status === "occupied").length;
  const todays = appointments.filter((a) => a.date === today);
  const revenue = invoices.filter((i) => i.status !== "cancelled").reduce((s, i) => s + i.paid, 0);
  const pending = invoices.reduce((s, i) => s + invoiceBalance(i), 0);
  const finance = useMemo(() => monthlyFinance(lang), [lang]);

  const upcoming = appointments
    .filter((a) => a.date >= today && (a.status === "scheduled" || a.status === "confirmed"))
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .slice(0, 6);

  const monthAppts = appointments.filter((a) => a.date.slice(0, 7) === today.slice(0, 7));
  const statusData = Object.keys(appointmentStatus).map((k, i) => ({
    name: appointmentStatus[k]?.[lang] ?? k,
    value: monthAppts.filter((a) => a.status === k).length,
    color: CHART_COLORS[i] ?? "var(--chart-1)",
  }));

  const deptStats = L.departments.map((d) => ({
    id: d.id,
    name: tx(d.name),
    icon: d.icon,
    patients: L.patients.filter((p) => p.departmentId === d.id).length,
    doctors: L.doctors.filter((x) => x.departmentId === d.id).length,
  }));
  const maxDept = Math.max(1, ...deptStats.map((d) => d.patients));

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return t("صباح الخير", "Good morning");
    if (h < 18) return t("مساء الخير", "Good afternoon");
    return t("مساء الخير", "Good evening");
  })();

  const stats = [
    { label: t("إجمالي المرضى", "Total patients"), value: formatNumber(L.patients.length, lang), icon: Users, tone: "primary" as const, trend: 12, hint: t("عن الشهر الماضي", "vs last month") },
    { label: t("إجمالي الأطباء", "Total doctors"), value: formatNumber(L.doctors.length, lang), icon: Stethoscope, tone: "info" as const, hint: t(`${formatNumber(L.doctors.filter((d) => d.status === "available").length, lang)} متاح الآن`, `${L.doctors.filter((d) => d.status === "available").length} available now`) },
    { label: t("إجمالي الموظفين", "Total employees"), value: formatNumber(L.employees.length, lang), icon: UserCog, tone: "success" as const, trend: 4, hint: t("هذا العام", "this year") },
    { label: t("مواعيد اليوم", "Today's appointments"), value: formatNumber(todays.length, lang), icon: CalendarCheck, tone: "warning" as const, hint: t(`${formatNumber(todays.filter((a) => a.status === "completed").length, lang)} مكتمل`, `${todays.filter((a) => a.status === "completed").length} completed`) },
    { label: t("الأسرّة المتاحة", "Available beds"), value: formatNumber(availableBeds, lang), icon: BedSingle, tone: "success" as const, hint: t(`من ${formatNumber(beds.length, lang)} سرير`, `of ${beds.length} beds`) },
    { label: t("الأسرّة المشغولة", "Occupied beds"), value: formatNumber(occupiedBeds, lang), icon: BedDouble, tone: "danger" as const, hint: t(`نسبة الإشغال ${Math.round((occupiedBeds / Math.max(1, beds.length)) * 100)}%`, `${Math.round((occupiedBeds / Math.max(1, beds.length)) * 100)}% occupancy`) },
    { label: t("إجمالي الإيرادات", "Total revenue"), value: formatCompactMoney(revenue, lang), icon: Wallet, tone: "primary" as const, trend: 8 },
    { label: t("مدفوعات معلقة", "Pending payments"), value: formatCompactMoney(pending, lang), icon: CreditCard, tone: "warning" as const, hint: t(`${formatNumber(invoices.filter((i) => invoiceBalance(i) > 0).length, lang)} فاتورة`, `${invoices.filter((i) => invoiceBalance(i) > 0).length} invoices`) },
  ];

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-hero p-6 text-primary-foreground shadow-elevated md:p-8"
      >
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm text-primary-foreground/75">{formatDate(today, lang, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
            <h1 className="mt-1 text-2xl font-bold md:text-3xl">
              {greeting}، {settings.user.name.split(" ").slice(0, 2).join(" ")}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-primary-foreground/80">
              {t(
                `لديك ${formatNumber(todays.length, lang)} موعداً اليوم و${formatNumber(L.patients.filter((p) => p.status === "critical").length, lang)} حالات حرجة تحت المتابعة.`,
                `You have ${todays.length} appointments today and ${L.patients.filter((p) => p.status === "critical").length} critical cases under observation.`,
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link to="/appointments" search={{ new: true }}>
                <CalendarPlus /> {t("موعد جديد", "New appointment")}
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground">
              <Link to="/patients" search={{ new: true }}>
                <UserPlus /> {t("تسجيل مريض", "Register patient")}
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} index={i} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title={t("الإيرادات الشهرية", "Monthly revenue")}
          description={t("الإيرادات مقابل المصروفات خلال آخر ١٢ شهراً", "Revenue vs expenses over the last 12 months")}
          action={<span className="rounded-full bg-success-soft px-2.5 py-1 text-xs font-medium text-success">{formatCompactMoney(finance.reduce((s, m) => s + m.revenue, 0), lang)}</span>}
          bodyClassName="p-4"
        >
          <MoneyAreaChart
            data={finance}
            series={[
              { key: "revenue", label: t("الإيرادات", "Revenue"), color: "var(--chart-1)" },
              { key: "expenses", label: t("المصروفات", "Expenses"), color: "var(--chart-4)" },
            ]}
          />
        </Panel>
        <Panel title={t("إحصائيات المواعيد", "Appointment statistics")} description={t("هذا الشهر", "This month")} bodyClassName="p-5">
          <DonutChart data={statusData} centerValue={formatNumber(monthAppts.length, lang)} centerLabel={t("موعد", "appointments")} height={200} />
          <div className="mt-4">
            <Legendary data={statusData} />
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel className="xl:col-span-2" title={t("إحصائيات المرضى", "Patient statistics")} description={t("الزيارات والمرضى الجدد والمقيمين شهرياً", "Visits, new and admitted patients per month")} bodyClassName="p-4">
          <GroupedBarChart
            data={finance}
            xKey="month"
            series={[
              { key: "patients", label: t("الزيارات", "Visits"), color: "var(--chart-1)" },
              { key: "newPatients", label: t("مرضى جدد", "New patients"), color: "var(--chart-2)" },
              { key: "inpatients", label: t("مقيمين", "Admitted"), color: "var(--chart-3)" },
            ]}
          />
        </Panel>
        <Panel
          title={t("المواعيد القادمة", "Upcoming appointments")}
          action={
            <Button variant="ghost" size="sm" asChild>
              <Link to="/appointments">
                {t("الكل", "View all")} <Arrow />
              </Link>
            </Button>
          }
        >
          <ul className="divide-y">
            {upcoming.map((a) => (
              <li key={a.id} className="flex items-center gap-3 px-5 py-3">
                <PersonAvatar name={L.patientName(a.patientId)} size="sm" />
                <div className="min-w-0 flex-1">
                  <Link to="/patients/$id" params={{ id: a.patientId }} className="block truncate text-sm font-medium hover:text-primary">
                    {L.patientName(a.patientId)}
                  </Link>
                  <p className="truncate text-xs text-muted-foreground">
                    {L.doctorName(a.doctorId)} · {appointmentType[a.type]?.[lang]}
                  </p>
                </div>
                <div className="text-end">
                  <p className="inline-flex items-center gap-1 text-xs font-medium">
                    <Clock className="size-3" /> {formatTime(a.time, lang)}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{a.date === today ? t("اليوم", "Today") : formatDate(a.date, lang, { day: "numeric", month: "short" })}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title={t("إحصائيات الأقسام", "Department statistics")}
          action={
            <Button variant="ghost" size="sm" asChild>
              <Link to="/departments">
                {t("الأقسام", "Departments")} <Arrow />
              </Link>
            </Button>
          }
          bodyClassName="grid gap-x-8 gap-y-4 p-5 sm:grid-cols-2"
        >
          {deptStats.map((d) => {
            const Icon = departmentIconFor(d.icon);
            return (
              <div key={d.id} className="flex items-center gap-3">
                <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex items-center justify-between gap-2 text-sm">
                    <span className="truncate font-medium">{d.name}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatNumber(d.patients, lang)} {t("مريض", "patients")} · {formatNumber(d.doctors, lang)} {t("طبيب", "doctors")}
                    </span>
                  </div>
                  <Progress value={(d.patients / maxDept) * 100} className="h-1.5" />
                </div>
              </div>
            );
          })}
        </Panel>
        <Panel title={t("آخر النشاطات", "Recent activities")}>
          <ul className="space-y-1 p-3">
            {activities.slice(0, 7).map((a) => (
              <li key={a.id} className="flex gap-3 rounded-lg p-2 hover:bg-muted/60">
                <NotificationIcon type={a.type} className="size-8" />
                <div className="min-w-0">
                  <p className="text-sm">{tx(a.text)}</p>
                  <p className="text-[11px] text-muted-foreground">{timeAgo(a.createdAt, lang)}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title={t("أحدث الفواتير", "Latest invoices")} action={<Button variant="ghost" size="sm" asChild><Link to="/finance">{t("المالية", "Finance")} <Arrow /></Link></Button>}>
        <div className="grid divide-y sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {invoices.slice(0, 4).map((inv) => (
            <div key={inv.id} className="space-y-2 p-5 sm:border-e last:border-e-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground" dir="ltr">{inv.number}</span>
                <StatusBadge map={{ paid: { ar: "مدفوعة", en: "Paid", tone: "success" }, pending: { ar: "مستحقة", en: "Pending", tone: "warning" }, partial: { ar: "جزئي", en: "Partial", tone: "info" }, overdue: { ar: "متأخرة", en: "Overdue", tone: "danger" }, cancelled: { ar: "ملغاة", en: "Cancelled", tone: "muted" } }} value={inv.status} />
              </div>
              <p className="truncate font-medium">{L.patientName(inv.patientId)}</p>
              <p className="text-lg font-bold">{formatMoney(invoiceTotal(inv), lang)}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
