import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderComponent} from './order/order.component';
import { AuthGuard } from './guard/auth.guard';
import {ProfileComponent} from './profile/profile.component';
import {CompanyComponent} from './company/company.component';
import {MainComponent} from './main/main.component';


const routes: Routes = [
  { path: 'my/profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'auth', component: CompanyComponent },
  { path: '', component: MainComponent },
  { path: ':url', component: OrderComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
