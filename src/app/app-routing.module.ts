import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PedidoComponent} from './pedido/pedido.component';


const routes: Routes = [
  { path: '', component: PedidoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
