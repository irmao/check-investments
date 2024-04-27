import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NuinvestResponse } from './nuinvest-response.model';
import { NuinvestRequest } from './nuinvest-request.model';
import { StorageService } from '../token-store/storage.service';

@Injectable({
  providedIn: 'root',
})
export class NuinvestService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  getChart(parameters: NuinvestRequest): Observable<NuinvestResponse> {
    const token = this.storage.getToken();

    return this.http.get<NuinvestResponse>(`https://www.nuinvest.com.br/api/benchmark-variableincome/chart/${parameters.actionCode}/${parameters.chartPeriod}`,
      { headers: { 'authorization': 'Bearer ' + token } });
  }
}
