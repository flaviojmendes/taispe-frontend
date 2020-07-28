import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companyUrl = environment.backendUrl + '/company';
  companyByEmailUrl = environment.backendUrl + '/company/email';
  companyByUrlUrl = environment.backendUrl + '/company/url';

  constructor(private http: HttpClient) { }

  getCompany() {
    return this.http.get<Company>(this.companyUrl);
  }

  getCompanyByEmail(email: string) {
    return this.http.post<Company>(this.companyByEmailUrl, email);

  }

  getCompanyByUrl(email: string) {
    return this.http.post<Company>(this.companyByUrlUrl, email);

  }

  saveCompany(company: Company) {
    return this.http.post<Company>(this.companyUrl, company);
  }
}
