import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {CompanyService} from '../service/company.service';
import {CategoryService} from '../service/category.service';
import {ProductService} from '../service/product.service';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  constructor(public auth: AuthService, public companyService: CompanyService,
              public categoryService: CategoryService, public productService: ProductService) { }

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  saving = false;

  invalidFields: any = {};

  company: Company = {};
  categories: Category[] = [{}];
  products: Product[] = [{}];
  category: Category = {};
  product: Product = {
    description: []
  };

  ngOnInit() {

    if (!this.isAuthenticated()) {
      this.auth.login('/my/profile');
    }

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

  isAuthenticated() {
    return this.auth.hasAuthentication();
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
    this.saving = true;

    if (!this.validate()) {
      this.saving = false;
      return;
    }

    this.companyService.saveCompany(this.company).subscribe( data => {
        this.company = data;
        this.saving = false;
        this.invalidFields = {};
      },
      err => {
        this.invalidFields.duplicatedUrl = true;
        this.saving = false;
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

      this.resizeImage(files[0], 500, 500).then(blob => {

        reader.readAsDataURL(blob);
        reader.onload = () => {
          this.product.img = typeof reader.result === 'string' ? reader.result : undefined;
        };

      }, err => {
        console.error('Photo error', err);
      });
    }
  }

  resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        const width = image.width;
        const height = image.height;

        if (width <= maxWidth && height <= maxHeight) {
          resolve(file);
        }

        let newWidth;
        let newHeight;

        if (width > height) {
          newHeight = height * (maxWidth / width);
          newWidth = maxWidth;
        } else {
          newWidth = width * (maxHeight / height);
          newHeight = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;

        const context = canvas.getContext('2d');

        context.drawImage(image, 0, 0, newWidth, newHeight);

        canvas.toBlob(resolve, file.type);
      };
      image.onerror = reject;
    });
  }


  private validate() {
    let valid = true;

    if (!this.company.url) {
      this.invalidFields.url = true;
      valid = false;
    }

    if (!this.company.name) {
      this.invalidFields.name = true;
      valid = false;
    }

    if (!this.company.whatsappNumber) {
      this.invalidFields.whatsappNumber = true;
      valid = false;
    }

    if (valid) {
      this.invalidFields = {};
    }

    return valid;
  }
}
