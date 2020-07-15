import { Injectable } from '@angular/core';
import {CurrencyPipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private currencyPipe: CurrencyPipe) { }

  SEPARATOR = '---------------\n';

  buildOrder(cart, comments) {
    let order = '';

    const title = 'Olá, gostaria de pedir: \n';
    const orderText = this.buildListItems(cart) + '\n';
    const commentsTitle = 'Observações: \n';
    const totalText = 'Total: ' + this.updateTotal(cart);
    const commentsText = comments && comments !== '' ? commentsTitle + ' ' + comments : '';
    order = '```' +
      title + this.SEPARATOR +
      orderText + this.SEPARATOR +
      commentsText +
      this.SEPARATOR +
      totalText +
      '```';

    return encodeURIComponent(order);
  }

  buildListItems(cart: any) {
    let orderItems = '';
    for (const key of Object.keys(cart)) {
      if (cart[key].quantity !== 0) {
        orderItems += cart[key].quantity + ' - ' + key + '\n';
      }
    }

    return orderItems;
  }

  updateTotal(cart: any) {
    let total = 2;

    for (const key of Object.keys(cart)) {
      total += cart[key].quantity * cart[key].price;
    }
    const totalPrice = this.currencyPipe.transform(total, 'BRL');
    return totalPrice;
  }

}
