import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyService} from "../../currency.service";
import {map} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
currencyData: any [] = [];
subscription: any;
  constructor(private currencyService: CurrencyService ) { }

  ngOnInit(): void {
   this.subscription = this.currencyService.getExchangeRate()
      .pipe(
        map(currency => currency.filter((x:any) => x.currencyCodeB == 980 && x.currencyCodeA == 840 || x.currencyCodeA == 978))
      )
      .subscribe((res: any) => {
         res.map((x: any) => {
          if (x.currencyCodeA == 840) {
            x.currencyCodeA = 'USD'
          }
          if (x.currencyCodeA == 978) {
            x.currencyCodeA = 'EUR'
          }
          if (x.currencyCodeA == 980) {
            x.currencyCodeA = 'UAH'
          }
          if (x.currencyCodeB == 980) {
            x.currencyCodeB = 'UAH'
          }
           if (x.currencyCodeB == 840) {
             x.currencyCodeB = 'USD'
           }
        })
        this.currencyData = res.filter( (x: any) => x.currencyCodeB == 'UAH')
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
