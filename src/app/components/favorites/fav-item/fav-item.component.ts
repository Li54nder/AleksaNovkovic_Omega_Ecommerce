import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-fav-item',
  templateUrl: './fav-item.component.html',
  styleUrls: ['./fav-item.component.scss']
})
export class FavItemComponent {
  @Input() product!: {
    id: number
    title: string
    price: number
    discountPercentage: number
  };
  @Output() removeFromFavEmit = new EventEmitter<number>();
  @Output() addToCartEmit = new EventEmitter<number>();

  removeFromFav(productId: number) {
    this.removeFromFavEmit.emit(productId);
  }

  addToCart(productId: number) {
    this.addToCartEmit.emit(productId);
  }

}
