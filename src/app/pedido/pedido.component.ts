import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.sass']
})
export class PedidoComponent implements OnInit {

  constructor() { }

  qtdDisponivel: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  item1: number;
  item2: number;
  pedido: string;
  observacoes = '';

  ngOnInit() {
  }

  atualizarPedido() {
    const titulo = 'Olá, gostaria de pedir: \n';
    const tituloObservacoes = 'Observações: \n';
    const prato1 = this.item1 ? 'Dog no Molho: ' + this.item1 + ' unidades. \n' : '';
    const prato2 = this.item2 ? 'Dog no Molho Especial: ' + this.item2 + ' unidades. \n' : '';
    const observacoes = this.observacoes && this.observacoes !== '' ? tituloObservacoes + ' ' + this.observacoes : '';

    this.pedido = titulo + '\n' +
      prato1 + prato2 +
      observacoes;

    this.pedido = encodeURIComponent(this.pedido);
  }

}
