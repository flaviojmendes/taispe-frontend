interface Company {
 id?: string;
 name?: string;
 logo?: string;
 url?: string;
 email?: any;
 whatsappNumber?: string;
 primaryColor?: string;
 backgroundColor?: string;
 deliveryPrice?: number;
 requireAddress?: boolean;
 requireName?: boolean;
}

interface Category {
  id?: string;
  label?: string;
  dependsOn?: string[];
  products?: Product[];
  company?: Company;
}


interface Product {
  id?: string;
  label?: string;
  price?: number;
  img?: string;
  qtyAvailable?: number;
  description?: string[];
  subProducts?: Product[];
  category?: Category;
}
