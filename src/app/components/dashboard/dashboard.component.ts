import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { BSubjectUserService } from 'src/app/services/b-subject-user.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading = false;
  pageLimit = 10;
  numOfLoaded: number = 0;
  products: Product[] = [];
  categories: string[] = [];

  form!: FormGroup;

  user: User | undefined;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private userSubject: BSubjectUserService
  ) {}

  ngOnInit() {
    this.userSubject.currentUser.subscribe(user => {
      this.user = user;
    });
    this.initForm();
    this.getProducts();
    this.getCategories();
  }

  initForm() {
    this.form = this.fb.group({
      query: '',
      category: undefined
    });
    this.form.controls['query'].valueChanges.subscribe(value => {
      if(!value) {
        this.clearDashboard();
        this.getProducts();
      }
    });
  }

  clearDashboard() {
    this.pageLimit = 10;
    this.numOfLoaded = 0;
    this.products = [];
  }

  getProducts(limit = this.pageLimit) {
    this.loading = true;
    this.productsService.getProducts(this.numOfLoaded, limit).subscribe({
      next: res => {
        this.loading = false;
        this.numOfLoaded = res.skip + res.limit;
        this.products = [...this.products, ...res.products];
      }
    })
  }

  getCategories() {
    this.productsService.getProductsCategories().subscribe({
      next: res => {
        this.categories = res;
      }
    })
  }

  onScroll() {
    this.getProducts();
  }

  onSearch() {
    this.clearDashboard();
    this.form.controls['category'].setValue(undefined);
    this.loading = true;
    this.productsService.getProductsByQuery(this.form.value.query).subscribe({
      next: res => {
        this.loading = false;
        this.products = res.products;
      }
    })
  }

  searchByCategory(event: MatSelectChange) {
    this.clearDashboard();
    this.form.controls['query'].setValue('');
    if(!event.value) {
      this.getProducts();
      return;
    }
    this.loading = true;
    this.productsService.getProductsByCategory(event.value).subscribe({
      next: res => {
        this.loading = false;
        this.products = res.products;
      }
    });
  }
}
