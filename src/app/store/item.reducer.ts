import { createReducer, on } from "@ngrx/store";
import { CartItem } from "../models/cartItem";
import { add, remove, total } from "./item.actions";

export interface ItemState {
  items: CartItem[],
  total: number
}

export const initialState: ItemState = {
  items: JSON.parse(sessionStorage.getItem('cart') || '[]'),
  total: 0
};

export const itemReducer = createReducer(
  initialState,
  on(add, (state, { product }) => {
    //recorrer el arreglo para verificar si ya se agregó un item del mismo tipo
    const hasItem = state.items.find((item: CartItem) => item.product.id === product.id);
    if (hasItem) {
      return {
        items: state.items.map((item: CartItem) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
          }),
        total: state.total
      }
    } else {
      return {
        //si es el primer objeto del tipo se agrega con cantidad 1
        items: [...state.items, { product: { ...product }, quantity: 1 }],
        total: state.total
      };
    }
  }),
  on(remove, (state, { id }) => {
    return {
      items: state.items.filter(item => item.product.id !== id),
      total: state.total
    }
  }),
  on(total, state => {
    return {
      items: state.items,
      total: state.items.reduce( (accum, item) => accum + (item.quantity * item.product.price), 0 )
    }
  })
);
