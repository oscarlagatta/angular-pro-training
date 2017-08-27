import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { StockValidators } from './stock-inventory.validators';

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
                    [map]="productMap"
                    (removed)="removeStock($event)">
                </stock-products>

                <div class="stock-inventory__price">
                    Total: {{ total | currency:'GBP':true}}
                </div>
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

    products: Product[];

    total: number;
    
    productMap: Map<number, Product>;

    constructor(
        private fb: FormBuilder,
        private stockService: StockInventoryService){
        Observable.forkJoin()    
    }

    ngOnInit() {
     
        const cart = this.stockService.getCartItems();
        const products= this.stockService.getProducts();   

        Observable
            .forkJoin(cart, products)
            .subscribe( ([cart, products]: [Item[], Product[]]) => {
                
                const myMap = products.map<[number, Product]>( product => [product.id, product])

                this.productMap = new Map<number, Product>(myMap);
                this.products = products;

                cart.forEach( item => this.addStock(item));

                this.calculateTotal(this.form.get('stock').value);
                this.form.get('stock')
                    .valueChanges.subscribe( value => 
                       this.calculateTotal(value));
            });

    }

    calculateTotal(value: Item[]) {
        const  total = value.reduce((prev, next) => {
            return prev + (next.quantity * this.productMap.get(next.product_id).price)
        }, 0);

        this.total  = total;
    }
    
    form = this.fb.group({
        store: this.fb.group({
            branch: ['', [Validators.required, StockValidators.checkBranch]],
            code: ['', Validators.required]
        }),
        selector: this.createStock({}),
        // FormArray allows us to create a collection 
            // of particular FormControls or particular FormGroups
            // but we manage and compose these ourselves
        stock: this.fb.array([])
    }, {validator: StockValidators.checkStockExists});


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