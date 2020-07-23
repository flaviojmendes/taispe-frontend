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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CompanyComponent } from './company/company.component';
import { ProfileComponent } from './profile/profile.component';
import {FormsModule} from '@angular/forms';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {TokenInterceptor} from './auth/token.interceptor';
import { MainComponent } from './main/main.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { UrlDirective } from './url.directive';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    CompanyComponent,
    ProfileComponent,
    MainComponent,
    UrlDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    CurrencyMaskModule,
    FontAwesomeModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'},
    CurrencyPipe,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
