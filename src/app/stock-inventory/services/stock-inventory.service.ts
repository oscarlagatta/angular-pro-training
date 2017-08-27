import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

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
          return response.json();
        })
        .catch((error: any) => Observable.throw(error.json()));
    }

    getProducts(): Observable<Product[]>{
        return this.http
            .get('http://localhost:3000/api/v1/products')
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => Observable.throw(error));
    }

    // checkBranchId(id: string): Observable<boolean> {
    //     let search = new URLSearchParams();
    //     search.set('id', id);
    //     return this.http
    //         .get('http://localhost:3000/api/v1/branches', { search })
    //         .map((response: Response) => {
    //             console.log(response.json());
    //             return response.json();
    //         })
    //         .map((response: any[]) => !!response.length)
    //         .catch((error: any) => Observable.throw(error));
    // }


    checkBranchId(id: string): Observable<boolean> {
        let search = new URLSearchParams();
        search.set('id', id);
        console.log('branchId selected', id);
        return this.http
          .get(`http://localhost:3000/api/v1/branches/${id}`)
          .map((response: Response) => {
              console.log(response.json());
              return response.json();
            })
          .map((response: any) => {

            console.log('response.length', response);
            return !!response.id;
        })
          .catch((error: any) => Observable.throw(error.json()));
      }
}