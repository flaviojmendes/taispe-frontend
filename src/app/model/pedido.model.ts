interface Itens {
  itens: Item[];
}

interface Item {
  label: string;
  qtd: number;
  preco?: number;
}
