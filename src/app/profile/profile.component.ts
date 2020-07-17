import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {CompanyService} from '../service/company.service';
import {CategoryService} from '../service/category.service';
import {ProductService} from '../service/product.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  constructor(public auth: AuthService, public companyService: CompanyService,
              public categoryService: CategoryService, public productService: ProductService) { }

  company: Company = {};
  categories: Category[] = [{}];
  products: Product[] = [{}];
  category: Category = {};
  product: Product = {
    description: []
  };

  ngOnInit() {
    this.auth.userProfile$.subscribe(data => {
      this.companyService.getCompanyByEmail(data.email).subscribe(value => {
        if (value) {
          this.company = value;
          this.getCategories();
        } else {
          this.company = {email: data.email};
        }
      });
    });
  }

  getCategories() {
    this.categoryService.getCategories(this.company.id).subscribe(value => {
      this.categories = value;
    });
  }

  getProducts(categoryId: string) {
    this.productService.getProductsByCategory(categoryId).subscribe(value => {
      this.products = value;
    });
  }

  setProduct(product: Product) {
    if (!product.description) {
      product.description = [];
    }
    this.product = product;
  }


  newProduct() {
    this.product = {
      qtyAvailable: 10,
      description: [],
      category: {
        id: this.category.id
      }
    };
  }


  save() {
    this.companyService.saveCompany(this.company).subscribe( data => {
        this.company = data;
      },
      err => {
        console.log(err.message);
      });
  }

  setCategory(category: Category) {
    this.category = category;
    this.getProducts(category.id);
  }

  newCategory() {
    this.category = {
      company: {id: this.company.id}
    };
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.category, this.company.id).subscribe(value => {
      this.getCategories();
    });
  }

  saveCategory() {
    this.category.products = undefined;
    this.categoryService.saveCategory(this.category, this.company.id).subscribe(value => {
      this.getCategories();
    });
  }

  saveProduct() {
    this.productService.saveProduct(this.product, this.company.id).subscribe(value => {
      this.getProducts(this.category.id);
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product, this.company.id).subscribe(value => {
      this.getProducts(this.category.id);
    });
  }

  imgChanged(event) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.product.img = typeof reader.result === 'string' ? reader.result : undefined;
      };


    }
  }
}
