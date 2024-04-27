import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PerformanceChartComponent } from './performance-chart/performance-chart.component';
import { ChartPeriodEnum, NuinvestRequest } from '../nuinvest/nuinvest-request.model';
import { StorageService } from './token-store/storage.service';
import { TokenStoreComponent } from './token-store/token-store.component';
import { Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PerformanceChartComponent, TokenStoreComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  parameters: NuinvestRequest[][] = [];

  timePeriodLabels = {
    [ChartPeriodEnum.ONE_MONTH]: 'One Month',
    [ChartPeriodEnum.SIX_MONTHS]: 'Six Months',
    [ChartPeriodEnum.ONE_YEAR]: 'One Year',
  };

  actionCodes: string[] = [
    'BRCO11',
    'BTLG11',
    'CPTS11',
    'KNCR11',
    'KNSC11',
    'PVBI11',
    'RBRR11',
    'XPML11',
    'GOGL34',
    'BITH11',
    'BOVA11'
  ];

  timePeriods: ChartPeriodEnum[] = [
    ChartPeriodEnum.ONE_MONTH,
    ChartPeriodEnum.SIX_MONTHS,
    ChartPeriodEnum.ONE_YEAR
  ];

  get hasTokenSet$() {
    return this.storageService.hasTokenSet$;
  }

  constructor(private storageService: StorageService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.parameters = this.actionCodes.map(actionCode => 
      this.timePeriods.map(timePeriod =>({
          actionCode: actionCode,
          chartPeriod: timePeriod
        })
      )
    );

    this.timePeriodLabels[ChartPeriodEnum.ONE_MONTH] = 'One Month';

    this.hasTokenSet$.subscribe((value) => {
      if (value) {
        this.cdRef.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    this.storageService.clearToken();
  }
}
