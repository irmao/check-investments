import { ChartConfiguration } from "chart.js";

export type PerformanceChartDataType = ChartConfiguration<'line'>['data'] & { cssClass: string };
