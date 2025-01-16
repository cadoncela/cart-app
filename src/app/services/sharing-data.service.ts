import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _idProductEmitter: EventEmitter<number> = new EventEmitter();
  private _addEventEmitter: EventEmitter<Product> = new EventEmitter();

  constructor() { }

  get idProductEmitter(): EventEmitter<number>{
    return this._idProductEmitter;
  }

  get addEventEmitter(): EventEmitter<Product>{
    return this._addEventEmitter;
  }
}
