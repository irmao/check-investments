import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ActionRepositoryOption } from './action-repository-option.model';
import { ActionList } from './action-list.model';
import actionHistory from '../../assets/action-repository-data/action-history.json';
import smallCaps from '../../assets/action-repository-data/small-caps.json';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-action-repository-selector',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './action-repository-selector.component.html',
  styleUrls: ['./action-repository-selector.component.scss']
})
export class ActionRepositorySelectorComponent implements OnInit {

  options: ActionRepositoryOption[] = [];
  selectedOption: number = 0;
  @Output() selectedOptionChange: EventEmitter<ActionRepositoryOption> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this.loadData();
  }

  onSelectChange() {
    this.selectedOptionChange.emit(this.options[this.selectedOption]);
  }

  private loadData(): void {
    this.options = [
      new ActionRepositoryOption('My Actions', Object.assign(new ActionList(), actionHistory)),
      new ActionRepositoryOption('Small Caps', Object.assign(new ActionList(), smallCaps))
    ];

    this.selectedOption = 0;
    this.onSelectChange();
  }
}
