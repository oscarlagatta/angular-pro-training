import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Product, Item } from '../models/product.interface';


@Injectable()
export class StockInventoryService {

    constructor(private http: Http) {}

    getCartItems(): Observable<Item[]>{
        return this.http
        .get('http://localhost:3000/api/v1/cart')
        .map((response: Response) => { 
          response.json()
        })
        .catch((error: any) => Observable.throw(error.json()));
    }

    getProducts(): Observable<any[]>{
        return this.http
            .get('http://localhost:3000/api/v1/products')
            .map((response: Response) => {
                response.json();
            })
            .catch((error: any) => Observable.throw(error));
    }
}