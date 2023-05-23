import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyService} from "../../currency.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit, OnDestroy {
  currencyList: any;
  subscriptions: any[] = [];
  fromForm: any;
  toForm: any;

  constructor(private currencyService: CurrencyService) {
    this.createForms();
  }
  createForms() {
    this.fromForm = new FormGroup({
      currency: new FormControl('USD'),
      amount: new FormControl(100)
    })
    this.toForm = new FormGroup({
      currency: new FormControl('UAH'),
      amount: new FormControl(0)
    })
  }
  ngOnInit(): void {
   const subscription1 = this.currencyService.getCurrencySymbol()
      .subscribe((res: any) => {
      this.currencyList = Object.keys(res.symbols).map((key) => [key, res.symbols[key]])
    })
    this.convertCurrency({to: this.toForm.value, from: this.fromForm.value })
    this.subscriptions.push(subscription1);
  }
  convertCurrency(form: any) {
    const fromCurrency = form.from.currency
    const amount = form.from.amount
    const toCurrency = form.to.currency
    const subscription2 = this.currencyService.convertCurrency(toCurrency, fromCurrency, amount).subscribe((res: any) => {
      const result = res.result.toFixed(2)
    this.toForm.get('amount').setValue(result)
    })
    this.subscriptions.push(subscription2)
  }

  changeCurrency(form: any) {
    this.fromForm.get('currency').setValue(form.to.currency)
    this.toForm.get('currency').setValue(form.from.currency)
    this.convertCurrency({to: this.toForm.value, from: this.fromForm.value })
  }
  ngOnDestroy() {
    this.subscriptions.forEach((x) => {
      x.unsubscribe()
    })
  }

}
