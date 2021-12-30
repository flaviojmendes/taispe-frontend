import {Component, ElementRef, OnInit} from '@angular/core';
import {OrderService} from '../service/order.service';
import {CategoryService} from '../service/category.service';
import {CompanyService} from '../service/company.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';
import {DomSanitizer} from '@angular/platform-browser';
import '../model/product.model'

@Component({
  selector: 'app-pedido',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private orderService: OrderService, private categoryService: CategoryService,
              private companyService: CompanyService, private sanitizer: DomSanitizer,
              private elementRef: ElementRef) {}

  order: string;

  comments = '';
  name = '';
  address = '';

  invalidFields: any = {};

  total = 0;
  cart = {};
  company: Company;

  categories: Category[] = [];

  loading = true;
  companyLoadingStatus = 'LOADING';
  productsLoadingStatus = 'LOADING';

  ngOnInit() {

    console.log(environment.production);

    this.route.params.subscribe(params => {
      this.companyService.getCompanyByUrl(params.url).subscribe(company => {
        this.company = company;
        this.companyLoadingStatus = 'OK';
        this.getCategoryByPage(0);
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = company.backgroundColor;
        this.updateTotal();
      },
          error => this.companyLoadingStatus = 'ERROR');
    });

  }

  getCategoryByPage(page: number) {
    return this.categoryService.getCategoryByPage(this.company.id, page).subscribe( data => {
      if (!data) {
        this.loading = false;
        this.productsLoadingStatus = 'OK';
        return;
      }
      this.categories.push(data);
      this.getCategoryByPage(page + 1);
      },
      err => {
        this.productsLoadingStatus = 'ERROR';
      });
  }

  updateTotal() {
    this.total = this.company && this.company.deliveryPrice ? this.company.deliveryPrice : 0;

    for (const key of Object.keys(this.cart)) {
      this.total += this.cart[key].quantity * this.cart[key].price;
    }

  }

  updateCart(product: Product, qty: number) {
    this.cart[product.id] = {
      label: product.label,
      price: product.price,
      quantity: qty
    };
  }

  updateOrder() {
    const valid = this.validate();
    this.order = this.orderService.buildOrder(this.cart, this.comments, this.company.deliveryPrice, this.name, this.address);
    if (!valid) {
      document.querySelector('#personalData').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return valid;
  }

  validate() {
    let isValid = true;

    if (this.company.requireName) {
      if ((!this.name || this.name === '')) {
        this.invalidFields.name = true;
        isValid = false;
      }
    }

    if (this.company.requireAddress) {
      if ((!this.address || this.address === '')) {
        this.invalidFields.address = true;
        isValid = false;
      }
    }

    if (isValid) {
      this.invalidFields = {};
    }

    return isValid;
  }

  createArrayIndex(qtyAvailable: number) {
    return Array.from(Array((qtyAvailable + 1)).keys());
  }


  getButtonColor() {
    if (this.company) {
      return this.sanitizer
      .bypassSecurityTrustStyle(`background-color: ${this.company.primaryColor || '#fec059'} !important;` +
                                                    `color: ${this.company.backgroundColor} !important;`);
    }
  }

  getBgFontColor() {
    if (this.company) {
      return this.sanitizer.bypassSecurityTrustStyle(`color: ${this.company.backgroundColor} !important`);
    }
  }

  getBgColor() {
    if (this.company) {
      return this.sanitizer.bypassSecurityTrustStyle(`background-color: ${this.company.backgroundColor} !important`);
    }
  }

  getPrimaryBgColor() {
    if (this.company) {
      return this.sanitizer.bypassSecurityTrustStyle(`background-color: ${this.company.primaryColor} !important`);
    }
  }
  getPrimaryColor() {
    if (this.company) {
      return this.sanitizer.bypassSecurityTrustStyle(`color: ${this.company.primaryColor} !important`);
    }
  }
}
