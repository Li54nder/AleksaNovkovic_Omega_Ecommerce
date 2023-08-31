import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() product!: Product;
  @Output() deleteItem = new EventEmitter<number>();
  @Output() updateItem = new EventEmitter<{id: number, quantity: number}>();

  constructor(
    private cartsService: CartsService
  ) {}

  updateQuantity(productId: number, currentQuantity: number, increase: boolean) {
    if (!increase && currentQuantity == 1) {
      this.deleteItem.emit(productId);
    }
    else {
      const product = {
        id: productId,
        quantity: increase? ++currentQuantity : --currentQuantity
      }
      this.updateItem.emit(product);
    }
  }

  removeProduct(productId: number) {
    this.deleteItem.emit(productId);
  }
}
