import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { BSubjectUserService } from 'src/app/services/b-subject-user.service';
import { CartsService } from 'src/app/services/carts.service';
import { AdditionalInfoDialogComponent } from './additional-info-dialog/additional-info-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  user: User | undefined;
  products: Product[] = [];
  total = 0;
  loading = false;

  constructor(
    private cartsService: CartsService,
    private userSubject: BSubjectUserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userSubject.currentUser.subscribe((user) => {
      this.user = user;
      if (this.user) {
        this.loading = true;
        this.cartsService.getCartForUser(this.user.id).subscribe({
          next: (res) => {
            localStorage.setItem('cartId', res.carts[0].id);
            this.products = res.carts[0].products;
            this.total = res.carts[0].total;
            this.loading = false;
          },
        });
      }
    });
  }

  purchase() {
    let dialogRef = this.dialog.open(AdditionalInfoDialogComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((success) => {
      success
        ? this.snackBar.open('Product purchased!') //TODO: implement product purchasing
        : this.snackBar.open('Purchasing aborted!');
    });
  }

  deleteItem(productId: number) {
    this.products = this.products.filter((p) => p.id !== productId);
    this.updateCart();
  }

  updateItem(product: { id: number; quantity: number }) {
    this.products.map((p) => {
      if (p.id === product.id) {
        p.quantity = product.quantity;
      }
    });
    this.updateCart();
  }

  updateCart() {
    const cartId = localStorage.getItem('cartId');
    cartId
      ? this.cartsService
          .updateCartWithProducts(+cartId, this.products)
          .subscribe({
            next: (res) => {
              this.total = res.total;
              this.snackBar.open('Cart updated successfully!');
            },
          })
      : this.snackBar.open('Cart not found!');
  }
}
