interface Products {
  categories: Category[];
}

interface Category {
  id: string;
  label: string;
  dependsOn?: string[];
  products: Product[];
}

interface Product {
  id: string;
  label: string;
  price?: number;
  img?: string;
  qtyAvailable?: number;
  description?: string[];
  subProducts?: Product[];
}
