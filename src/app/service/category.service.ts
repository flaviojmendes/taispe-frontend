import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoriesUrl = environment.backendUrl + '/category/';
  categorieUpUrl = environment.backendUrl + '/category/up/';
  categorieDownUrl = environment.backendUrl + '/category/down/';

  constructor(private http: HttpClient) { }

  getCategories(companyId: string) {
    return this.http.get<Category[]>(this.categoriesUrl + companyId);
  }


  getCategoryByPage(companyId: string, page: number) {
    return this.http.get<Category>(this.categoriesUrl + companyId + '/' + page);
  }

  saveCategory(category: Category, companyId: string) {
    return this.http.post<Category[]>(this.categoriesUrl + companyId, category);
  }

  deleteCategory(category: Category, companyId: string) {
    return this.http.request('delete', this.categoriesUrl + companyId, {body: category});

  }

  reorderCategoryUp(category: Category, companyId: string) {
    return this.http.post<Category[]>(this.categorieUpUrl + companyId, category);
  }

  reorderCategoryDown(category: Category, companyId: string) {
    return this.http.post<Category[]>(this.categorieDownUrl + companyId, category);
  }
}
