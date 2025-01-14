import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnChanges {

  @Input() items!: CartItem[];
  total: number = 0;

  @Output() idProductEmitter: EventEmitter<any> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {

    //let itemsChange = changes['items'];
    this.calculateTotal();
    this.saveSession();

  }

  onDeleteCart(id: number): void {
    this.idProductEmitter.emit(id);
  }

  calculateTotal(): void {
    this.total = this.items.reduce(
      (accum, item) => accum + item.quantity * item.product.price,
      0
    );
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
