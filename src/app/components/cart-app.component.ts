import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {

  items: CartItem[] = [];
  total: number = 0;

  constructor(private sharingDataService: SharingDataService,
              private router: Router) {}

  ngOnInit(): void {
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(){
    this.sharingDataService.addEventEmitter.subscribe( product => {
      const hasItem = this.items.find( item => item.product.id === product.id);
    if (hasItem) {
      this.items = this.items.map( item => {
        if (item.product.id === product.id){
          return { ...item, quantity: item.quantity+1 }
        }
        return item;
      })
    }else {
      this.items = [... this.items, { product: { ...product }, quantity: 1 }];
    }
     this.calculateTotal();
     this.saveSession();
     this.router.navigate(['/cart'], {
      state: {items: this.items, total: this.total}
     });
     Swal.fire({
      title: "Carro de compras",
      text: "Producto agregado al carro",
      icon: "success",
    });
    });
  }

  onDeleteCart(): void{
    this.sharingDataService.idProductEmitter.subscribe( id =>{
      console.log(id + 'ejecta evento de emitter');

      Swal.fire({
        title: "Está seguro?",
        text: "NO se puede revertir despues!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
        this.items = this.items.filter(item => item.product.id !== id);
        if(this.items.length < 1){
          sessionStorage.removeItem('cart');
        }
        this.calculateTotal();
        this.saveSession();

        //para hacer un refresh de la pagina al momento de eliminar elementos del cart
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/cart'], {
              state: {items: this.items, total: this.total}
          });
        });
          Swal.fire({
            title: "Eliminado!",
            text: "Producto eliminado del carro.",
            icon: "success"
          });
        }
      });
    });
  }

   calculateTotal(): void{
     this.total = this.items.reduce( (accum, item) => accum + (item.quantity * item.product.price), 0 );
   }

   saveSession(): void{
     sessionStorage.setItem('cart', JSON.stringify(this.items));
   }


}
