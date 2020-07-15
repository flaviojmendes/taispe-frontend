import { Component, OnInit } from '@angular/core';
import {OrderService} from '../service/order.service';
import {CategoryService} from '../service/category.service';
import {CompanyService} from '../service/company.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private orderService: OrderService, private categoryService: CategoryService,
              private companyService: CompanyService) {}
  order: string;
  comments = '';
  total: number;
  cart = {};
  company: Company;

  categories: Category[];
  valid = false;

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.companyService.getCompanyByUrl(params.url).subscribe(company => {
        this.company = company;

        this.categoryService.getCategories(company.id).subscribe( data => this.categories = data,
          err => {
            console.log(err.message);
          });

        this.updateTotal();
        this.validate();
      });
    });

  }

  updateTotal() {
    this.total = this.company ? this.company.deliveryPrice : 0;

    for (const key of Object.keys(this.cart)) {
      this.total += this.cart[key].quantity * this.cart[key].price;
    }


    // this.total += this.orderService.calculateExtras(this.extras);

    // this.atualizarRefrisDisponiveis();
    // this.validate();
  }

  updateCart(product: Product, qty: number) {
    this.cart[product.label] = {
      price: product.price,
      quantity: qty
    };
  }

  updateOrder() {
    this.order = this.orderService.buildOrder(this.cart, this.comments);
  }

  validate() {
    // if (this.item1 === 0 && this.item2 === 0) {
    //   this.valid = false;
    //   return;
    // }
    //
    // if (this.totalDrinks > this.totalDrinksAvailable) {
    //   this.valid = false;
    //   return;
    // }
    this.valid = true;
  }

  createArrayIndex(qtyAvailable: number) {
    return Array.from(Array((qtyAvailable + 1)).keys());
  }
}
