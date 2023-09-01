import { Product } from "./product";

export interface GetUserCharts {
  carts: {
    id: number;
    products: Product[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: 5;
    totalQuantity: number;
  }[];
  total: number;
  skip: number;
  limit: number;
}

export interface AddedChart {
    "id": number,
    "products": Product[],
    "total": number,
    "discountedTotal": number,
    "userId": number,
    "totalProducts": number,
    "totalQuantity": number
}

export interface UpdatedChart {
  "id": number,
  "products": Product[],
  "total": number,
  "discountedTotal": number,
  "userId": number,
  "totalProducts": number,
  "totalQuantity": number
}
