import { AbstractControl } from '@angular/forms';

export class StockValidators {
    static checkBranch(control: AbstractControl) {
        // starts with a=z followed by 3 numbers 
        // $ inidcates the end of the string
        const regexp = /^[a-z]\d{3}$/i;
        const valid = regexp.test(control.value);
        
        return valid ? null : { invalidBranch: true }
    }
}