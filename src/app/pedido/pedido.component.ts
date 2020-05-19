import { Component, OnInit } from '@angular/core';
import {PedidoService} from '../pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.sass']
})
export class PedidoComponent implements OnInit {

  constructor(private pedidoService: PedidoService) {
  }

  qtdDisponivel: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  extrasDisponiveis: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  refrisDisponiveis: number[] = [0];
  item1 = 0;
  item2 = 0;
  pedido: string;
  observacoes = '';
  total: number;

  extras: Itens = {
    itens: [{
      label: 'Bombom de Uva',
      preco: 4,
      qtd: 0
    },
    {
      label: 'Bacon',
      preco: 3,
      qtd: 0
    },
    {
      label: 'Queijo',
      preco: 2,
      qtd: 0
    },
    {
      label: 'Salsicha',
      preco: 2,
      qtd: 0
    }]
  };

  bebidas = {
    itens: [
    {
      label: 'Coca-Cola',
      qtd: 0
    },
    {
      label: 'Guaraná',
      qtd: 0
    },
    {
      label: 'Suco de Abacaxi',
      qtd: 0
    },
    {
      label: 'Suco de Goiaba',
      qtd: 0
    },
    {
      label: 'Suco de Laranja',
      qtd: 0
    },
    {
      label: 'Suco de Maracujá',
      qtd: 0
    },
    {
      label: 'Suco de Uva',
      qtd: 0
    }],
  };

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
    this.total += this.pedidoService.calculaExtras(this.extras);

    this.atualizarRefrisDisponiveis();
    this.valida();
  }

  atualizarRefrisDisponiveis() {
    this.totalRefris = 0;
    for (const bebida of this.bebidas.itens) {
      this.totalRefris += bebida.qtd;
    }

    this.totalRefrisDisponivel = this.item1 + this.item2;
    this.refrisDisponiveis = [];
    for (let i = 0 ; i <= this.totalRefrisDisponivel ; i++) {
      this.refrisDisponiveis.push(i);
    }
    this.valida();
  }

  atualizarExtras() {

  }

  atualizarPedido() {
    this.pedido = this.pedidoService.montarPedido(this.item1, this.item2, this.observacoes, this.extras, this.bebidas);
  }

  valida() {
    if (this.item1 === 0 && this.item2 === 0) {
      this.valido = false;
      return;
    }

    if (this.totalRefris > this.totalRefrisDisponivel) {
      this.valido = false;
      return;
    }
    this.valido = true;
  }

}
