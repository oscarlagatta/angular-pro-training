import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import { StockInventoryService } from '../../services/stock-inventory.service';

import { Product , Item } from '../../models/product.interface';

@Component({
    selector: 'stock-inventory',
    styleUrls: ['stock-inventory.component.scss'],
    template: `
    
        <div class="stock-inventory">
            <form [formGroup]="form" (ngSubmit)="onSubmit()">

                <stock-branch 
                    [parent]="form">
                </stock-branch>

                <stock-selector 
                    [parent]="form"
                    [products]="products"
                    (added)="addStock($event)">
                </stock-selector>

                <stock-products 
                    [parent]="form"
                    (removed)="removeStock($event)">
                </stock-products>

                <div class="stock-inventory__buttons">
                    <button
                     type="submit"
                     [disabled]='form.invalid'>
                        Order Stock
                    </button>
                </div>

                <pre>{{ form.value | json }}</pre>

            </form>
        </div>
    `
})
export class StockInventoryComponent implements OnInit {


    constructor(
        private fb: FormBuilder,
        private stockService: StockInventoryService){
        Observable.forkJoin()    
    }

    ngOnInit() {
     
        this.stockService.getCartItems().subscribe( data=> console.log('data',data));
        
        const cart = this.stockService.getCartItems();
        const products= this.stockService.getProducts();   

        Observable
        .forkJoin(cart, products)
        .subscribe(([cart, products]: [Item[], Product[]]) => {
          
            console.log('cart', cart);
            console.log('products', products);
            
        });

    }

    products: Product[];

    productMap: Map<number, Product>;
    
    form = this.fb.group({
        store: this.fb.group({
            branch: '',
            code: ''
        }),
        selector: this.createStock({}),
        // FormArray allows us to create a collection 
            // of particular FormControls or particular FormGroups
            // but we manage and compose these ourselves
        stock: this.fb.array([])
    });


    createStock(stock) {
        return this.fb.group({
            product_id: new FormControl(parseInt(stock.product_id, 10) || ''),
            quantity: new FormControl(stock.quantity || 10)
        });
    }
    onSubmit() {
        console.log('submit', this.form.value);
    }

    addStock(stock) {
        const control = this.form.get('stock') as FormArray;
        control.push(this.createStock(stock));
    }

    removeStock({group, index}: { group: FormGroup, index: number}){

        const control = this.form.get('stock') as FormArray;
        control.removeAt(index);
    }

}