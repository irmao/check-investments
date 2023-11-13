export class NuinvestRequest {
    actionCode!: string;
    chartPeriod: ChartPeriodEnum = 3;
}

export enum ChartPeriodEnum {
    ONE_MONTH = 3,
    SIX_MONTHS = 4,
    ONE_YEAR = 5,
}
