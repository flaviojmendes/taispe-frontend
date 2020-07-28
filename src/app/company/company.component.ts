import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.sass']
})
export class CompanyComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.handleAuthCallback();

  }

}
