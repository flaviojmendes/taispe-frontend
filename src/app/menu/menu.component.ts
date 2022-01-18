import { Component, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LanguageUtil } from 'src/util/language.util';
import { CategoryService } from '../service/category.service';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  constructor(private route: ActivatedRoute, private categoryService: CategoryService,
    private companyService: CompanyService, private sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    public languageUtil: LanguageUtil) { }


  company: Company;

  categories: Category[] = [];

  loading = true;
  companyLoadingStatus = 'LOADING';
  productsLoadingStatus = 'LOADING';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.companyService.getCompanyByUrl(params.url).subscribe(company => {
        this.company = company;

        if(!this.company.currency) {
          this.company.currency = 'BRL';
        }

        this.companyLoadingStatus = 'OK';
        this.getCategoryByPage(0);
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = company.backgroundColor;

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
