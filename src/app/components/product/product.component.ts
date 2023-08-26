import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    this.id = param? +param : 0;
    this.getProduct();
  }

  getProduct() {
    this.productsService.getProductById(this.id).subscribe({
      next: res => {
        console.log(res);

      }
    })
  }


}
