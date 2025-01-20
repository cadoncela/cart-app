import { createReducer, on } from "@ngrx/store";
import { findAll, load } from "./product.actions";

const products: any[] = [];

const initialState = {
  products
}

export const productReducer = createReducer(
  initialState,
  on(load, (state) => ({ products: [... state.products] })),
  on(findAll, (state, { products }) => ({ products: [... products] }))
);
