import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { BSubjectUserService } from 'src/app/services/b-subject-user.service';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  id!: number;
  loading = false;
  product!: Product;
  favorites: {
    id: number;
    title: string;
    price: number;
    discountPercentage: number;
  }[] = [];

  user: User | undefined;
  dummyCounter = 0;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private userSubject: BSubjectUserService,
    private cartsService: CartsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userSubject.currentUser.subscribe((user) => {
      this.user = user;
    });
    let fav = localStorage.getItem('favorites');
    this.favorites = fav ? JSON.parse(fav) : [];
    const param = this.route.snapshot.paramMap.get('id');
    this.id = param ? +param : 0;
    this.getProduct();
  }

  getProduct() {
    this.loading = true;
    this.productsService.getProductById(this.id).subscribe({
      next: (res) => {
        this.loading = false;
        this.product = res;
      },
    });
  }

  toggleFavorite(product: Product) {
    this.dummyCounter++;
    let favorites = localStorage.getItem('favorites');
    if (!favorites) {
      let newArr = [
        {
          id: product.id,
          title: product.title,
          price: product.price,
          discountPercentage: product.discountPercentage,
        },
      ];
      localStorage.setItem('favorites', JSON.stringify(newArr));
      this.snackBar.open('Product added to favorites!');
    } else {
      let favoritesArr = JSON.parse(favorites);
      if (favoritesArr.find((p: { id: number }) => p.id === product.id)) {
        favoritesArr = favoritesArr.filter(
          (p: { id: number }) => p.id !== product.id
        );
        this.snackBar.open('Product removed from favorites!');
      } else {
        favoritesArr = [
          ...favoritesArr,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            discountPercentage: product.discountPercentage,
          },
        ];
        this.snackBar.open('Product added to favorites!');
      }
      localStorage.setItem('favorites', JSON.stringify(favoritesArr));
    }
  }

  addToCart(productId: number) {
    if (this.user) {
      const product = {
        id: productId,
        quantity: 1,
      };
      const cartId = localStorage.getItem('cartId');
      if (!cartId) {
        // Create new CART for the user who hasn't it yet
        this.cartsService.createCartForUser(this.user.id, [product]).subscribe({
          next: (_) => {
            this.snackBar.open('Product added to your cart!');
          },
        });
      } else {
        // Add product to existing CART
        this.cartsService.updateCartWithProducts(+cartId, [product]).subscribe({
          next: (res) => {
            this.snackBar.open('Product added to your cart!');
            localStorage.setItem('cartId', res.id);
          },
        });
      }
    }
  }
}
