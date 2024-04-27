import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { NuinvestService } from '../../nuinvest/nuinvest.service';
import { NuinvestChartItem } from '../../nuinvest/nuinvest-chart-item.model';
import { Observable, Subject, last, of, switchMap, takeUntil, throwError } from 'rxjs';
import { NuinvestRequest } from '../../nuinvest/nuinvest-request.model';
import { PerformanceChartDataType } from './performance-chart-data-type.adapter';
import { NuinvestSeriesItem } from '../../nuinvest/nuinvest-series-item.model';

@Component({
  selector: 'app-performance-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './performance-chart.component.html',
  styleUrl: './performance-chart.component.scss'
})
export class PerformanceChartComponent implements OnDestroy {

  private _parameters: NuinvestRequest  = new NuinvestRequest();

  get parameters(): NuinvestRequest {
    return this._parameters;
  }

  @Input() set parameters(value: NuinvestRequest) {
    this._parameters = value;
    this.requestValuesFromServer();
  }

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 0
      }
    } 
  };

  private destroy$ = new Subject<void>();
  public chartData$: Observable<PerformanceChartDataType> | undefined;

  constructor(private nuinvest: NuinvestService) { }

  requestValuesFromServer(): void {
    this.chartData$ = this.nuinvest.getChart(this.parameters).pipe(
      takeUntil(this.destroy$),
      switchMap(response =>
        response.items?.length > 0
          ? of(this.createChartData(response.items[0]))
          : throwError(() => new Error('invalid response from service'))));
  }

  createChartData(item: NuinvestChartItem): PerformanceChartDataType {
    return {
      cssClass: this.calculateClass(item),
      yield: this.calculateYield(item.series),
      labels: item.series.map(s => this.formatDate(s.dateTime)),
      datasets: [{
        data: item.series.map(s => s.value),
        label: item.label,
        fill: false,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }]
    };
  }

  calculateClass(item: NuinvestChartItem): string {
    const firstValue = item.series[0].value;
    const lastValue = item.series[item.series.length - 1].value;
    const diff = lastValue - firstValue;

    if (diff < 0) {
      return 'decrease';
    }

    if (diff > 0) {
      return 'increase';
    }

    return '';
  }

  calculateYield(item: NuinvestSeriesItem[]): number | null {
    const size = item.length;

    return size > 1
      ? 100 * (item[size-1].value / item[0].value) - 100
      : null;
  }

  formatDate(dateTimeStr: string) {
    const dateTime = new Date(dateTimeStr);
    return dateTime.getDate() + "/" + dateTime.getMonth();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
