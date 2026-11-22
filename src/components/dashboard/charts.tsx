import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { useI18n } from "@/contexts/settings";
import { formatCompactMoney, formatMoney, formatNumber } from "@/utils/format";

export const CHART_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "var(--info)", "var(--muted-foreground)"];

const tooltipStyle = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    color: "var(--popover-foreground)",
    fontSize: 12,
    boxShadow: "var(--shadow-card)",
  },
  labelStyle: { color: "var(--muted-foreground)", marginBottom: 4 },
  cursor: { fill: "var(--muted)", opacity: 0.5 },
};
const axis = { stroke: "var(--muted-foreground)", fontSize: 11, tickLine: false, axisLine: false } as const;

export function MoneyAreaChart({ data, series, height = 300 }: { data: Record<string, string | number>[]; series: { key: string; label: string; color: string }[]; height?: number }) {
  const { lang, isRTL } = useI18n();
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 8, left: 8, bottom: 0 }}>
        <defs>
          {series.map((s) => (
            <linearGradient key={s.key} id={`g-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={s.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="month" {...axis} reversed={isRTL} />
        <YAxis {...axis} orientation={isRTL ? "right" : "left"} width={70} tickFormatter={(v: number) => formatCompactMoney(v, lang)} />
        <Tooltip {...tooltipStyle} cursor={{ stroke: "var(--border)" }} formatter={(v: number, name: string) => [formatMoney(v, lang), name]} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        {series.map((s) => (
          <Area key={s.key} type="monotone" dataKey={s.key} name={s.label} stroke={s.color} strokeWidth={2.5} fill={`url(#g-${s.key})`} />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function GroupedBarChart({ data, xKey, series, height = 300, money, layout = "horizontal" }: { data: Record<string, string | number>[]; xKey: string; series: { key: string; label: string; color: string }[]; height?: number; money?: boolean; layout?: "horizontal" | "vertical" }) {
  const { lang, isRTL } = useI18n();
  const fmt = (v: number) => (money ? formatCompactMoney(v, lang) : formatNumber(v, lang));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout={layout} margin={{ top: 10, right: 8, left: 8, bottom: 0 }} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={layout === "vertical"} horizontal={layout === "horizontal"} />
        {layout === "horizontal" ? (
          <>
            <XAxis dataKey={xKey} {...axis} reversed={isRTL} />
            <YAxis {...axis} orientation={isRTL ? "right" : "left"} width={50} tickFormatter={fmt} />
          </>
        ) : (
          <>
            <XAxis type="number" {...axis} reversed={isRTL} tickFormatter={fmt} />
            <YAxis type="category" dataKey={xKey} {...axis} orientation={isRTL ? "right" : "left"} width={120} />
          </>
        )}
        <Tooltip {...tooltipStyle} formatter={(v: number, name: string) => [money ? formatMoney(v, lang) : formatNumber(v, lang), name]} />
        {series.length > 1 && <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />}
        {series.map((s) => (
          <Bar key={s.key} dataKey={s.key} name={s.label} fill={s.color} radius={layout === "horizontal" ? [6, 6, 0, 0] : [0, 6, 6, 0]} maxBarSize={28} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DonutChart({ data, height = 240, centerLabel, centerValue }: { data: { name: string; value: number; color: string }[]; height?: number; centerLabel?: string; centerValue?: string }) {
  const { lang } = useI18n();
  return (
    <div className="relative" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius="62%" outerRadius="88%" paddingAngle={3} stroke="none">
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Tooltip {...tooltipStyle} formatter={(v: number, name: string) => [formatNumber(v, lang), name]} />
        </PieChart>
      </ResponsiveContainer>
      {centerValue && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="text-2xl font-bold text-foreground">{centerValue}</p>
            {centerLabel && <p className="text-xs text-muted-foreground">{centerLabel}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export function Legendary({ data }: { data: { name: string; value: number; color: string }[] }) {
  const { lang } = useI18n();
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  return (
    <ul className="space-y-2">
      {data.map((d) => (
        <li key={d.name} className="flex items-center gap-2 text-sm">
          <span className="size-2.5 rounded-full" style={{ background: d.color }} />
          <span className="flex-1 text-muted-foreground">{d.name}</span>
          <span className="font-semibold">{formatNumber(d.value, lang)}</span>
          <span className="w-10 text-end text-xs text-muted-foreground">{Math.round((d.value / total) * 100)}%</span>
        </li>
      ))}
    </ul>
  );
}
