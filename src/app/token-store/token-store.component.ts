import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-token-store',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './token-store.component.html',
  styleUrl: './token-store.component.scss'
})
export class TokenStoreComponent {
  tokenInput = '';

  constructor(private storage: StorageService) {}

  storeTokenInput() {
    this.storage.storeToken(this.tokenInput);
  }
}
