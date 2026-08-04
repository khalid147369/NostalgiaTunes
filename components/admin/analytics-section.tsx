"use client";

import { motion } from "framer-motion";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { categoryPlays, formatNumber, playsOverTime } from "@/lib/mock-data";
import { SectionHeader } from "./section-header";

const tooltipStyle = {
  backgroundColor: "oklch(0.2 0.03 283)",
  border: "1px solid oklch(1 0 0 / 12%)",
  borderRadius: "0.75rem",
  color: "oklch(0.97 0.005 285)",
  fontSize: "0.8rem",
};

export function AnalyticsSection() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Insights"
        title="Analytics"
        description="How the archive is performing. Plays, likes, and the universes that resonate the most."
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="glass rounded-2xl p-5"
        >
          <h3 className="font-heading text-lg font-bold">Plays over time</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Monthly listens across the whole archive.
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={playsOverTime}
                margin={{ top: 8, right: 8, bottom: 0, left: -8 }}
              >
                <defs>
                  <linearGradient
                    id="playsGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--color-chart-1)"
                      stopOpacity={0.45}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--color-chart-1)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(1 0 0 / 7%)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v: number) => formatNumber(v)}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v) => [formatNumber(Number(v)), "Plays"]}
                />
                <Area
                  type="monotone"
                  dataKey="plays"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2.5}
                  fill="url(#playsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45, ease: "easeOut" }}
          className="glass rounded-2xl p-5"
        >
          <h3 className="font-heading text-lg font-bold">Plays by universe</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Which worlds the community revisits most.
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryPlays}
                margin={{ top: 8, right: 8, bottom: 0, left: -8 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(1 0 0 / 7%)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="var(--color-muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  tickFormatter={(v: string) =>
                    v.length > 8 ? `${v.slice(0, 7)}…` : v
                  }
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v: number) => formatNumber(v)}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ fill: "oklch(1 0 0 / 5%)" }}
                  formatter={(v) => [formatNumber(Number(v)), "Plays"]}
                />
                <Bar
                  dataKey="plays"
                  fill="var(--color-chart-2)"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.45, ease: "easeOut" }}
          className="glass rounded-2xl p-5 xl:col-span-2"
        >
          <h3 className="font-heading text-lg font-bold">Likes over time</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Hearts given each month across all songs.
          </p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={playsOverTime}
                margin={{ top: 8, right: 8, bottom: 0, left: -8 }}
              >
                <defs>
                  <linearGradient
                    id="likesGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--color-chart-2)"
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--color-chart-2)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(1 0 0 / 7%)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v: number) => formatNumber(v)}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v) => [formatNumber(Number(v)), "Likes"]}
                />
                <Area
                  type="monotone"
                  dataKey="likes"
                  stroke="var(--color-chart-2)"
                  strokeWidth={2.5}
                  fill="url(#likesGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
