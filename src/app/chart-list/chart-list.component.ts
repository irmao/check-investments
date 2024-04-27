import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PerformanceChartComponent } from '../performance-chart/performance-chart.component';
import { ActionList } from '../action-repository-selector/action-list.model';
import { ChartPeriodEnum, NuinvestRequest } from '../nuinvest/nuinvest-request.model';

@Component({
  selector: 'app-chart-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PerformanceChartComponent],
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.scss']
})
export class ChartListComponent implements OnInit {
  private _actionList: ActionList = new ActionList();

  parameters: NuinvestRequest[][] = [];

  timePeriodLabels = {
    [ChartPeriodEnum.ONE_MONTH]: 'One Month',
    [ChartPeriodEnum.SIX_MONTHS]: 'Six Months',
    [ChartPeriodEnum.ONE_YEAR]: 'One Year',
  };

  timePeriods: ChartPeriodEnum[] = [
    ChartPeriodEnum.ONE_MONTH,
    ChartPeriodEnum.SIX_MONTHS,
    ChartPeriodEnum.ONE_YEAR
  ];

  @Input() set actionList(value: ActionList) {
    this._actionList = value;

    this.parameters = this.actionList.listItems.map(historyItem =>
      this.timePeriods.map(timePeriod => ({
        actionCode: historyItem.actionCode,
        chartPeriod: timePeriod
      })
      )
    );
  }

  get actionList(): ActionList {
    return this._actionList;
  }

  ngOnInit(): void {
    this.timePeriodLabels[ChartPeriodEnum.ONE_MONTH] = 'One Month';
  }
}
