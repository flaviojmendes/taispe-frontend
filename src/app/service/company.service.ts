import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companyUrl = 'http://menu.flaviojmendes.com:8181/company';
  companyByEmailUrl = 'http://menu.flaviojmendes.com:8181/company/email/';
  companyByUrlUrl = 'http://menu.flaviojmendes.com:8181/company/url/';

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
