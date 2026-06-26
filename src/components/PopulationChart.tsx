"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TrendingUp, Users } from "lucide-react";

interface PopulationDataPoint {
  year: number;
  value: number;
}

interface PopulationChartProps {
  data: PopulationDataPoint[];
}

export default function PopulationChart({ data }: PopulationChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-96 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <Users className="h-12 w-12 text-slate-400 dark:text-slate-600" />
        <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">No Population Data</h3>
        <p className="mt-2 text-sm text-slate-500 max-w-xs">
          Historical population growth data is not available for this country.
        </p>
      </div>
    );
  }

  // Find population trend direction
  const firstPop = data[0].value;
  const lastPop = data[data.length - 1].value;
  const percentChange = ((lastPop - firstPop) / firstPop) * 100;
  const isGrowing = percentChange >= 0;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Users className="text-indigo-600 dark:text-indigo-400" size={24} />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Population Growth
            </h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Historical population timeline from {data[0].year} to {data[data.length - 1].year}
          </p>
        </div>

        <div className="flex items-center gap-2.5 rounded-2xl bg-slate-50 px-4 py-2 text-sm font-medium dark:bg-slate-800/50">
          <TrendingUp
            className={`h-4 w-4 ${isGrowing ? "text-emerald-500" : "text-rose-500"}`}
          />
          <span className="text-slate-600 dark:text-slate-300">
            Growth over time:
          </span>
          <span className={`font-semibold ${isGrowing ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
            {isGrowing ? "+" : ""}{percentChange.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPopulation" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-slate-200 dark:stroke-slate-800"
              vertical={false}
            />
            <XAxis
              dataKey="year"
              dy={10}
              tickLine={false}
              axisLine={false}
              className="text-xs fill-slate-400 font-medium"
            />
            <YAxis
              tickFormatter={(value) => {
                if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
                if (value >= 1e6) return `${(value / 1e6).toFixed(0)}M`;
                if (value >= 1e3) return `${(value / 1e3).toFixed(0)}K`;
                return value.toString();
              }}
              dx={-5}
              tickLine={false}
              axisLine={false}
              className="text-xs fill-slate-400 font-medium"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const dataPoint = payload[0].payload as PopulationDataPoint;
                  return (
                    <div className="rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Year {dataPoint.year}
                      </p>
                      <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                        {dataPoint.value.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500 font-medium">
                        Total Population
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#4f46e5"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorPopulation)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
