import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, CartComponent, NavbarComponent],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {

  products: Product[] = [];
  items: CartItem[] = [];
  total: number = 0;
  showCart: boolean = false;

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.products = this.service.fuindAll();
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
  }

  onAddCart(product: Product){
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
  }

  onDeleteCart(idProduct: number): void{
    this.items = this.items.filter(item => item.product.id !== idProduct);
    this.calculateTotal();
    this.saveSession();
    if(this.items.length < 1){
      this.showCart = false;
    }
  }

  calculateTotal(): void{
    this.total = this.items.reduce( (accum, item) => accum + (item.quantity * item.product.price), 0 );
  }

  saveSession(): void{
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  openCart(): void{
    this.showCart = !this.showCart;
  }
}
