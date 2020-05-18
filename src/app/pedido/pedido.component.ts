import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.sass']
})
export class PedidoComponent implements OnInit {

  constructor() { }

  qtdDisponivel: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  refrisDisponiveis: number[] = [0];
  item1 = 0;
  item2 = 0;
  item3 = 0;
  pedido: string;
  observacoes = '';
  total: number;

  cocaCola = 0;
  guarana = 0;
  totalRefris = 0;
  totalRefrisDisponivel = 0;

  valido = false;

  ngOnInit() {
    this.atualizarValor();
    this.valida();
  }

  atualizarValor() {
    this.total = 2;
    this.total += this.item1 ? (this.item1 * 9.99) : 0;
    this.total += this.item2 ? (this.item2 * 11.99) : 0;
    this.total += this.item3 ? (this.item3 * 4) : 0;
    this.atualizarRefrisDisponiveis();
    this.valida();
  }

  atualizarRefrisDisponiveis() {
    this.totalRefris = this.cocaCola + this.guarana;
    this.totalRefrisDisponivel = this.item1;
    this.refrisDisponiveis = [];
    for (let i = 0 ; i <= this.item1 ; i++) {
      this.refrisDisponiveis.push(i);
    }
    this.valida();
  }

  atualizarPedido() {
    const titulo = 'Olá, gostaria de pedir: \n';
    const tituloObservacoes = 'Observações: \n';
    const prato1 = this.item1 ? 'Dog no Molho: ' + this.item1 + ' unidades. \n' : '';
    const prato2 = this.item2 ? 'Dog no Molho Especial: ' + this.item2 + ' unidades. \n' : '';
    const prato3 = this.item3 ? 'Bombom de Uva: ' + this.item3 + ' unidades. \n' : '';
    const observacoes = this.observacoes && this.observacoes !== '' ? tituloObservacoes + ' ' + this.observacoes : '';

    this.pedido = titulo + '\n' +
      prato1 + prato2 + prato3 +
      observacoes;

    this.pedido = encodeURIComponent(this.pedido);
  }

  valida() {
    if (this.item1 === 0 && this.item2 === 0 && this.item3 === 0) {
      this.valido = false;
      return;
    }

    if(this.cocaCola + this.guarana > this.totalRefrisDisponivel) {
      this.valido = false;
      return;
    }
    this.valido = true;
  }

}
