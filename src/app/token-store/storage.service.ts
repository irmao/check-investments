import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private static TOKEN_KEY = 'access-token';

  public hasTokenSet$: Subject<boolean> = new Subject<boolean>(); 

  constructor() { }

  storeToken(token: string) {
    localStorage.setItem(StorageService.TOKEN_KEY, token);
    this.hasTokenSet$.next(!!token);
  }

  getToken(): string {
    return localStorage.getItem(StorageService.TOKEN_KEY) ?? '';
  }

  clearToken() {
    localStorage.removeItem(StorageService.TOKEN_KEY);
    this.hasTokenSet$.next(false);
  }
}
