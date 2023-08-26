import { PriceBeforeDiscountPipe } from './price-before-discount.pipe';

describe('PriceBeforeDiscountPipe', () => {
  it('create an instance', () => {
    const pipe = new PriceBeforeDiscountPipe();
    expect(pipe).toBeTruthy();
  });
});
