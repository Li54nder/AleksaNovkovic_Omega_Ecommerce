import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { BSubjectUserService } from 'src/app/services/b-subject-user.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  id!: number;
  loading = false;
  product!: Product;

  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private userSubject: BSubjectUserService
  ) {}

  ngOnInit() {
    this.userSubject.currentUser.subscribe(user => {
      this.user = user;
    });
    const param = this.route.snapshot.paramMap.get('id');
    this.id = param? +param : 0;
    this.getProduct();
  }

  getProduct() {
    this.loading = true;
    this.productsService.getProductById(this.id).subscribe({
      next: res => {
        this.loading = false;
        console.log(res);
        this.product = res;
      }
    })
  }


}
