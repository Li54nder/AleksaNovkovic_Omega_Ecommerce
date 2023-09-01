import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(skip: number = 0, limit: number = 10) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<{
      products: Product[];
      total: number;
      skip: number;
      limit: number;
    }>(environment.url + `/products?skip=${skip}&limit=${limit}`, { headers });
  }

  getProductsCategories() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<string[]>(environment.url + `/products/categories`, {
      headers,
    });
  }

  getProductsByQuery(query: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<{
      products: Product[];
      total: number;
      skip: number;
      limit: number;
    }>(environment.url + `/products/search?q=${query}`, { headers });
  }

  getProductsByCategory(category: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<{
      products: Product[];
      total: number;
      skip: number;
      limit: number;
    }>(environment.url + `/products/category/${category}`, { headers });
  }

  getProductById(id: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Product>(environment.url + `/products/${id}`, {
      headers,
    });
  }
}
