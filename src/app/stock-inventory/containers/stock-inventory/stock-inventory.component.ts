import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

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
                    [parent]="form">
                </stock-selector>

                <stock-products 
                    [parent]="form">
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
export class StockInventoryComponent {
    form = new FormGroup({
        store: new FormGroup({
            branch: new FormControl(''),
            code: new FormControl('')
        }),
        selector: new FormGroup({
            product_id: new FormControl(''),
            quantity: new FormControl(10)
        }), // FormArray allows us to create a collection 
            // of particular FormControls or particular FormGroups
            // but we manage and compose these ourselves
        stock: new FormArray([])
    });

    onSubmit() {
        console.log('submit', this.form.value);
    }

}