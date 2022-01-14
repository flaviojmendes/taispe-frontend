import { Injectable } from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import { LanguageUtil } from 'src/util/language.util';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private currencyPipe: CurrencyPipe, public languageUtil: LanguageUtil) { }

  SEPARATOR = '\n---------------\n';

  buildOrder(cart, comments, deliveryPrice, name, address, language, currency) {
    let order = '';

    const title = this.languageUtil.getByCode(language, 'would_like_to_order') + ': ';
    const orderText = this.buildListItems(cart);
    const commentsTitle = this.languageUtil.getByCode(language, 'observations') + ': ';
    const totalText = this.languageUtil.getByCode(language, 'total') + ': ' + this.updateTotal(cart, deliveryPrice, currency);
    const commentsText = comments && comments !== '' ? commentsTitle + '\n' + comments + this.SEPARATOR : '';

    const nameTitle = this.languageUtil.getByCode(language, 'name') + ': ';
    const nameText = name && name !== '' ? nameTitle + '\n' + name + this.SEPARATOR : '';
    const addressTitle = this.languageUtil.getByCode(language, 'address') + ': ';
    const addressText = address && address !== '' ? addressTitle + '\n' + address + this.SEPARATOR : '';
    order = '```' +
      title + this.SEPARATOR +
      orderText + this.SEPARATOR +
      commentsText +
      nameText +
      addressText +
      totalText +
      '```';

    return encodeURIComponent(order);
  }

  buildListItems(cart: any) {
    let orderItems = '';
    for (const key of Object.keys(cart)) {
      if (cart[key].quantity !== 0) {
        orderItems += cart[key].quantity + ' - ' + cart[key].label + '\n';
      }
    }

    return orderItems;
  }

  updateTotal(cart: any, deliveryPrice: number, currency: string) {
    let total = deliveryPrice ? deliveryPrice : 0;

    for (const key of Object.keys(cart)) {
      total += cart[key].quantity * cart[key].price;
    }
    const totalPrice = this.currencyPipe.transform(total, currency ? currency : 'BRL');
    return totalPrice;
  }

}
