import { ChartConfiguration } from "chart.js";

type CustomData = {
    cssClass: string,
    yield: number | null
};

export type PerformanceChartDataType = ChartConfiguration<'line'>['data'] & CustomData;
