import {
  Component,
  OnInit
} from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { ItemState } from '../../store/item.reducer';
import { total } from '../../store/item.actions';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit{

  items!: CartItem[];
  total: number = 0;

  constructor(private sharingDataService: SharingDataService,
              private store: Store<{ items: ItemState }>){
    this.store.select('items').subscribe( state => {
      this.items = state.items;
      this.total = state.total;
    });

  }
  ngOnInit(): void {

  }

  onDeleteCart(id: number): void {
     this.sharingDataService.idProductEmitter.emit(id);
  }
}
