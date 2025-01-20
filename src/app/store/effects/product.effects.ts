import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../../services/product.service";
import { catchError, EMPTY, exhaustMap, map } from "rxjs";
import { products } from "../../data/product.data";
import { findAll, load } from "../product.actions";

@Injectable()
export class ProductEffects {

  //atributo que contiene una funcion de flecha. cuando se active la funcion load va a ejecutar el proceso de llamar al service.
  //exhaustMap hace una lamada asincrona al service
  loadProducts$ = createEffect(
    () => this.actions$.pipe(
      ofType(load),
      exhaustMap(() => this.service.fuindAll())
    ).pipe(
      map( products => ( findAll({ products }) ) ),
      catchError(() => EMPTY)
    )
  );

  constructor(
    private actions$: Actions,
    private service: ProductService
  ){}
}
