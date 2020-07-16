import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderComponent } from './order/order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {CurrencyPipe, registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { CompanyComponent } from './company/company.component';
import { ProfileComponent } from './profile/profile.component';
import {FormsModule} from '@angular/forms';
import {CurrencyMaskModule} from 'ng2-currency-mask';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    CompanyComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    CurrencyMaskModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
