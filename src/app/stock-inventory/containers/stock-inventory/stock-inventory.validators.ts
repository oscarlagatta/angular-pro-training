import { AbstractControl } from '@angular/forms';

export class StockValidators {
    static checkBranch(control: AbstractControl) {
        // starts with a=z followed by 3 numbers 
        // $ inidcates the end of the string
        const regexp = /^[a-z]\d{3}$/i;
        const valid = regexp.test(control.value);
        
        return valid ? null : { invalidBranch: true }
    }

    static checkStockExists(control: AbstractControl) {

        const stockItem = control.get('stock');
        const selector = control.get('selector');

        if (!(stockItem && selector)) return null;

        const exists = stockItem.value.some((stock) => {
            return stock.product_id === parseInt(selector.value.product_id);
        });

        return exists ? { stockExists: true } : null;
    }
}