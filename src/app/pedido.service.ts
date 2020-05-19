import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor() { }

  SEPARADOR = '---------------\n';

  montarPedido(item1, item2, observacoes, extras, bebidas) {
    let pedido = '';

    const titulo = 'Olá, gostaria de pedir: \n';
    const prato1 = item1 ? 'Dog no Molho: ' + item1 + ' unidades. \n' : '';
    const prato2 = item2 ? 'Dog no Molho Especial: ' + item2 + ' unidades. \n' : '';

    const bebidasTexto = 'As bebidas serão:\n ' + this.montarItensLista(bebidas) + '\n';

    const extrasTexto = 'Os extras serão:\n ' + this.montarItensLista(extras) + '\n';

    const tituloObservacoes = 'Observações: \n';

    const observacoesTexto = observacoes && observacoes !== '' ? tituloObservacoes + ' ' + observacoes : '';

    pedido = '```' +
      titulo + this.SEPARADOR +
      prato1 + prato2 + this.SEPARADOR +
      bebidasTexto +  this.SEPARADOR +
      extrasTexto + this.SEPARADOR +
      observacoesTexto +
      '```';

    return encodeURIComponent(pedido);
  }

  montarItensLista(itens: any) {
    const values = Object.values(itens);
    let itensPedido = '';
    for (const item of values) {
      if (item.qtd !== 0) {
        itensPedido += item.qtd + ' - ' + item.label + '\n';
      }
    }

    return itensPedido;
  }

  calculaExtras(extras) {
    const values = Object.values(extras);
    let total = 0;
    for (const item of values) {
      total += (item.qtd * item.preco);
    }
    return total;
  }

}
