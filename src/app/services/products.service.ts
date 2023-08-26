import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(skip: number, limit: number = 10) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<{
      products: Product[];
      total: number;
      skip: number;
      limit: number;
    }>(environment.url + `/products?skip=${skip}&limit=${limit}`, { headers });
  }
}
