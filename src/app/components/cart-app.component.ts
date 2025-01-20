import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { ItemState } from '../store/item.reducer';
import { add, remove, total } from '../store/item.actions';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  items: CartItem[] = [];

  constructor(
    private sharingDataService: SharingDataService,
    private router: Router,
    private store: Store<{ items: ItemState }>
  ) {
    this.store.select('items').subscribe((state) => {
      this.items = state.items;
      this.saveSession();
    });
  }

  ngOnInit(): void {
    this.store.dispatch(total());
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart() {
    this.sharingDataService.addEventEmitter.subscribe((product) => {
      this.store.dispatch(add({ product: product }));
      this.store.dispatch(total());
      this.router.navigate(['/cart']);
      Swal.fire({
        title: 'Carro de compras',
        text: 'Producto agregado al carro',
        icon: 'success',
      });
    });
  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEmitter.subscribe((id) => {
      console.log(id + 'ejecta evento de emitter');

      Swal.fire({
        title: 'Está seguro?',
        text: 'NO se puede revertir despues!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(remove({ id }));
          this.store.dispatch(total());
          if (this.items.length < 1) {
            sessionStorage.removeItem('cart');
          }
          this.router.navigate(['/cart']);
          //para hacer un refresh de la pagina al momento de eliminar elementos del cart
          //con el uso del store ya no es necesario usar este código
          /*this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/cart']);
            });*/
          Swal.fire({
            title: 'Eliminado!',
            text: 'Producto eliminado del carro.',
            icon: 'success',
          });
        }
      });
    });
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
