import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StorageService } from './token-store/storage.service';
import { TokenStoreComponent } from './token-store/token-store.component';
import { ActionList } from './action-repository-selector/action-list.model';
import { PerformanceChartListComponent } from './performance-chart-list/performance-chart-list.component';
import { ActionRepositorySelectorComponent } from './action-repository-selector/action-repository-selector.component';
import { ActionRepositoryOption } from './action-repository-selector/action-repository-option.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PerformanceChartListComponent, TokenStoreComponent, ActionRepositorySelectorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  selectedRepository: ActionRepositoryOption | undefined;

  get hasTokenSet$() {
    return this.storageService.hasTokenSet$;
  }

  get actionList(): ActionList {
    return this.selectedRepository?.data || new ActionList();
  }

  constructor(private storageService: StorageService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.hasTokenSet$.subscribe((value) => {
      if (value) {
        this.cdRef.detectChanges();
      }
    });
  }

  onRepositoryChange(value: ActionRepositoryOption) {
    this.selectedRepository = value;
  }

  ngOnDestroy(): void {
    this.storageService.clearToken();
  }
}
