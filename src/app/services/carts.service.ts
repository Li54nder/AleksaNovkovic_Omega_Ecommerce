import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  constructor(private http: HttpClient) {}

  getCartsForUser(userId: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(environment.url + `/users/${userId}/carts`, { headers });
    // return this.http.get<any>(environment.url + `/carts/user/${userId}`, { headers });
  }

  createCartForUser(userId: number, products: {id: number, quantity: number}[]) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      userId,
      products
    }
    return this.http.post<any>(environment.url + `/carts/add`, body, { headers });
  }

  // addProductToCart(userId: number, productId: number, quantity: number) {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const body = {
  //     merge: true, // this will include existing products in the cart
  //     products: [
  //       {
  //         id: productId,
  //         quantity,
  //       },
  //     ]
  //   }
  //   return this.http.put<any>(environment.url + `/carts/user/${userId}`, body, { headers });
  // }

  updateCartWithProducts(cartId: number, products: {id: number, quantity: number}[]) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      merge: false,
      products
    }
    return this.http.put<any>(environment.url + `/carts/${cartId}`, body, { headers });
  }
}
