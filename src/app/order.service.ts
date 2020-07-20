import { Injectable } from '@angular/core';
import { Items } from './model/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  SEPARATOR = '---------------\n';

  buildOrder(item1, item2, item3, item4, comments, extras, drinks) {
    let order = '';

    const title = 'Olá, gostaria de pedir: \n';
    const item1Text = item1 ? 'Dog no Molho: ' + item1 + ' unidades. \n' : '';
    const item2Text = item2 ? 'Dog no Molho Especial: ' + item2 + ' unidades. \n' : '';
    const item3Text = item3 ? 'Bombom de Uva 140ml: ' + item3 + ' unidades. \n' : '';
    const item4Text = item4 ? 'Bombom de Uva 220ml: ' + item4 + ' unidades. \n' : '';

    const drinksText = 'As bebidas serão:\n ' + this.buildListItems(drinks) + '\n';

    const extrasText = 'Os extras serão:\n ' + this.buildListItems(extras) + '\n';

    const commentsTitle = 'Observações: \n';

    const commentsText = comments && comments !== '' ? commentsTitle + ' ' + comments : '';

    order = '```' +
      title + this.SEPARATOR +
      item1Text + item2Text + item3Text + item4Text + this.SEPARATOR +
      drinksText +  this.SEPARATOR +
      extrasText + this.SEPARATOR +
      commentsText +
      '```';

    return encodeURIComponent(order);
  }

  buildListItems(items: Items) {
    let orderItems = '';
    for (const item of items.items) {
      if (item.qty !== 0) {
        orderItems += item.qty + ' - ' + item.label + '\n';
      }
    }

    return orderItems;
  }

  calculateExtras(extras: Items) {
    let total = 0;
    for (const item of extras.items) {
      total += (item.qty * item.price);
    }
    return total;
  }

}