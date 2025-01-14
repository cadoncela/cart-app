import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {

  @Input() product!: Product;

  @Output() addEventEmitter: EventEmitter<Product> = new EventEmitter();
  onAddCart(product: Product) {
    this.addEventEmitter.emit(product);
  };

}
