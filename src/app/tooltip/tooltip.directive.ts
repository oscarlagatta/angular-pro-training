import { Input, Directive, ViewContainerRef, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[tooltip]',
    exportAs: 'tooltip'
})
export class ToolTipDirective implements OnInit {

    tooltipElement = document.createElement('div');
    visible = false;

    /**
     * Instead of using a property we can use a setter 
     * which then give us this 'value' of what the @Input is
     * In our case will be astring and will be binding it to
     * the tooltip element document.createElement('div');
     */
    @Input()
    set tooltip(value) {
        this.tooltipElement.textContent = value;
    }

    hide() {
        this.tooltipElement.classList.remove('tooltip--active');
    }

    show() {
        this.tooltipElement.classList.add('tooltip--active');
    }

    /**
     *
     */
    constructor(private element: ElementRef) {}
    
    ngOnInit(){

        this.tooltipElement.className = 'tooltip';
        this.element.nativeElement.appendChild(this.tooltipElement);
        this.element.nativeElement.classList.add('tooltip-container');
    }
}