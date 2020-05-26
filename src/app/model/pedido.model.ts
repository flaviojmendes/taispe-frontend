export interface Items {
  items: Item[];
}

export interface Item {
  label: string;
  qty: number;
  price?: number;
}
