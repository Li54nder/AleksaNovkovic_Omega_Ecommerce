import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { BSubjectUserService } from 'src/app/services/b-subject-user.service';
import { CartsService } from 'src/app/services/carts.service';
import { AdditionalInfoDialogComponent } from './additional-info-dialog/additional-info-dialog.component';
import { HotToastService } from '@ngneat/hot-toast';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
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
    // private toastService: HotToastService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userSubject.currentUser.subscribe(user => {
      this.user = user;
      if(this.user) {
        this.loading = true;
        this.cartsService.getCartsForUser(this.user.id).subscribe({
          next: res => {
            // fix type
            res.carts.forEach((cart: any) => {
              this.products = [...this.products, ...cart.products];
              this.total += cart.total;
            });

            this.loading = false;
          }
        })
      }
    });
  }

  purchase() {
    let dialogRef = this.dialog.open(AdditionalInfoDialogComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(success => {
      success
        ? this.snackBar.open('success!')
        : this.snackBar.open('aborted!');
      // success
      //   ? this.toastService.success('success!')
      //   : this.toastService.success('aborted!');
    })
  }

}
