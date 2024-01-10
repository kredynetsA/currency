import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
    const apiKey: string = 'fca_live_FK7FGttKUhWi4iGcFELFM2kJp2zneiL5YahZilWM';
    return this.http.get(`https://api.freecurrencyapi.com/v1/currencies?apikey=${apiKey}&currencies`)
  }

  convertCurrency(to: any, from: any, amount: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'apikey': 'HtOL4FrU3DQvsDN2A3RguHyn9cT2klUB'
      })
    };
    return this.http.get(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, httpOptions)
  }

}
