import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceBeforeDiscount'
})
export class PriceBeforeDiscountPipe implements PipeTransform {

  transform(value: number, discount: number) {
    return Math.round((100 * value) / (100 - discount));
  }

}
