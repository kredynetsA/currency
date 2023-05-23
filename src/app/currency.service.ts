import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getExchangeRate():Observable<any> {
    return this.http.get('https://api.monobank.ua/bank/currency')
  }

  getCurrencySymbol(): Observable<any> {
    return this.http.get('https://api.apilayer.com/exchangerates_data/symbols')
  }

  convertCurrency(to: any, from: any, amount: any): Observable<any> {
    return this.http.get(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`)
  }

}
