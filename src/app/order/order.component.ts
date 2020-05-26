import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import * as extras from '../data/extras.json';
import * as drinks from '../data/drinks.json';
@Component({
  selector: 'app-pedido',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  constructor(private orderService: OrderService) {
  }

  qtyAvailable: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  qtyAvailableDrinks: number[] = [0];
  item1 = 0;
  item2 = 0;
  item3 = 0;
  item4 = 0;
  order: string;
  comments = '';
  total: number;

  // @ts-ignore
  extras: Items = extras.default;
  // @ts-ignore
  drinks = drinks.default;

  totalDrinks = 0;
  totalDrinksAvailable = 0;

  valid = false;

  ngOnInit() {
    this.updateTotal();
    this.validate();
  }

  updateTotal() {
    this.total = 3;
    this.total += this.item1 ? (this.item1 * 9.99) : 0;
    this.total += this.item2 ? (this.item2 * 11.99) : 0;
    this.total += this.item3 ? (this.item3 * 4) : 0;
    this.total += this.item4 ? (this.item4 * 5) : 0;
    this.total += this.orderService.calculateExtras(this.extras);

    this.updateAvailableDrinks();
    this.validate();
  }

  updateAvailableDrinks() {
    this.totalDrinks = 0;
    for (const drink of this.drinks.items) {
      this.totalDrinks += drink.qty;
    }

    this.totalDrinksAvailable = this.item1 + this.item2;
    this.qtyAvailableDrinks = [];
    for (let i = 0 ; i <= this.totalDrinksAvailable ; i++) {
      this.qtyAvailableDrinks.push(i);
    }
    this.validate();
  }

  updateOrder() {
    this.order = this.orderService.buildOrder(this.item1, this.item2, this.item3, this.item4, this.comments, this.extras, this.drinks);
  }

  validate() {
    if (this.item1 === 0 && this.item2 === 0 && this.item3 === 0 && this.item4 === 0) {
      this.valid = false;
      return;
    }

    if (this.totalDrinks > this.totalDrinksAvailable) {
      this.valid = false;
      return;
    }
    this.valid = true;
  }

}
