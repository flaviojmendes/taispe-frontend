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
  total = 0;
  cart = {};
  company: Company;

  categories: Category[] = [];
  valid = false;
  loading = true;

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.companyService.getCompanyByUrl(params.url).subscribe(company => {
        this.company = company;

        this.getCategoryByPage(0);

        this.updateTotal();
        this.validate();
      });
    });

  }

  getCategoryByPage(page: number) {
    return this.categoryService.getCategoryByPage(this.company.id, page).subscribe( data => {
      if (!data) {
        this.loading = false;
        return;
      }
      this.categories.push(data);
      this.getCategoryByPage(page + 1);
      },
      err => {
        console.log(err.message);
      });;
  }

  updateTotal() {
    this.total = this.company && this.company.deliveryPrice ? this.company.deliveryPrice : 0;

    for (const key of Object.keys(this.cart)) {
      this.total += this.cart[key].quantity * this.cart[key].price;
    }

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
    this.valid = true;
  }

  createArrayIndex(qtyAvailable: number) {
    return Array.from(Array((qtyAvailable + 1)).keys());
  }
}
