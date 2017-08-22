import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
    /**
     * Because we are using an attribute in the input tag called
     * credit-card we need to use an attribute selector using [] 
     */
    selector: '[credit-card]'
})
export class CreditCardDirective {
    /**
     * With HostBining we can bind to a particular property 
     * on the host, the host of this credit-card directive 
     * which is the INPUT element. 
     * we can then add a property or change the value of 
     * a property using the @HostBinding. In this case
     * we bind to the style object and we want to bind
     * to the border 
     */
    @HostBinding('style.border')
    border: string;
    /**
     * We pass the element input, so we create
     * an event listener for the Host, which is 
     * the element which we have bound the directive
     * to. 
     * And the we access the $event, we have an array
     * of strings we want to listen to
     */
    @HostListener('input', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        const input = event.target as HTMLInputElement;

        let trimmed = input.value.replace(/\s+/g, '');
        if (trimmed.length > 16)
        {
            trimmed = trimmed.substr(0,16);
        }

        let numbers = [];

        for(let i = 0; i < trimmed.length; i +=4){
            numbers.push(trimmed.substr(i,4));
        }
        
        input.value = numbers.join(' ');
        
        this.border = '';
        /**
         * we use a regular expression and the 
         * test method on the trimmed; so in this
         * case will check that the string doesn't
         * contain any numbers; if doesn't contain
         * only numbers we set the red border.
         */
        if (/[^\d]+/.test(trimmed)) {
            this.border = '1px solid red';
        }
    }
}