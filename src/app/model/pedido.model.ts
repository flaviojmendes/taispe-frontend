interface Items {
  items: Item[];
}

interface Item {
  label: string;
  qty: number;
  price?: number;
}
