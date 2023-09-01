import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { BSubjectUserService } from 'src/app/services/b-subject-user.service';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  user!: User | undefined;
  favorites: {
    id: number;
    title: string;
    price: number;
    discountPercentage: number;
  }[] = [];

  constructor(
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
  }

  removeFromFav(productId: number) {
    this.favorites = this.favorites.filter(
      (p: { id: number }) => p.id !== productId
    );
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    this.snackBar.open('Product removed from favorites!');
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
