import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    /**
     * Because we are using an attribute in the input tag called
     * credit-card we need to use an attribute selector using [] 
     */
    selector: '[credit-card]'
})
export class CreditCardDirective {
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
    }
}