import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pageLimit = 10;
  numOfLoaded: number = 0;
  products: Product[] = [];

  constructor(
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts(this.numOfLoaded, this.pageLimit).subscribe({
      next: res => {
        console.log(res);
        this.numOfLoaded = res.skip + res.limit;
        this.products = res.products;
      }
    })
  }
}
