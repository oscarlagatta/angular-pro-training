// To accesss to the child component we need ContentChild decorator, 
// and AfterContentInit 
import { Component, ChangeDetectorRef, Output, EventEmitter, ViewChildren, AfterViewInit, ContentChildren, QueryList, AfterContentInit } from '@angular/core';

import { AuthMessageComponent } from './auth-message.component';

import { User } from './auth-form.interface';
// In order to get access to the child component we need to import that 
// child component
import { AuthRememberComponent } from './auth-remember.component';

@Component({
    selector: 'auth-form',
    template: `
        <div>
            <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
                <ng-content select="h3"></ng-content>
                <label>
                    Email Address
                    <input type="email" name="email" ngModel>
                </label>
                <label>
                    Password
                    <input type="password" name="password" ngModel>
                </label>
                <ng-content select="auth-remember"></ng-content>
                <!-- auth-message component is a view child of the current component -->
                <auth-message [style.display]="(showMessage ? 'inherit': 'none')"></auth-message>
                <auth-message [style.display]="(showMessage ? 'inherit': 'none')"></auth-message>
                <auth-message [style.display]="(showMessage ? 'inherit': 'none')"></auth-message>
                <ng-content select="button"></ng-content>
            </form>
        </div>

    `
})
export class AuthFormComponent implements AfterContentInit, AfterViewInit {

    showMessage: boolean;
    
    /* ViewChildren *
         * The ViewChildren is only available inside 
         * the ngAfterViewInit() because is a live 
         * collection, and if we try to use it in 
         * the ngAfterContentInit() it won't be 
         * accessible.
    */
    @ViewChildren(AuthMessageComponent) message: QueryList<AuthMessageComponent>;

    // Configure the content child query
    @ContentChildren(AuthRememberComponent) remember: QueryList<AuthRememberComponent>;

    @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

    constructor(private cd: ChangeDetectorRef) {

    }    
    ngAfterViewInit() {
        /* ViewChildren only available*
         * The ViewChildren is only available inside 
         * the ngAfterViewInit()
         */
        if (this.message) {
            /* setTimeout explained *
             * Without the setTimeout it wont' work as we
             * are back to the old error message, 
             * Error: 
             * ExpressionChangedAfterItHasBeenCheckedError: 
             * Expression has changed after it was checked.    
             * Previous value: '7'. Current value: '30'.
             * 
             * Why does it work with the setTimeout ??
             *  A. this is because Angular change detection and
             *  if we ship this code to production it wouldn't 
             * actually throw an error, is the way change 
             * detection works when building the application 
             * but when we enable production mode Angular 
             * won't carry out this additional safety checks
             * for you.
             * The reason why we get an error is because the 
             * view has been initialized at this point and if
             * we want to change things before hand we ideally
             * use ngAfterContentInit() and the reason is
             * because we are mutating data after the view
             * has been completed, and the only way to fix
             * this is using the built in APIs which ties in
             * with change detection using a change detection
             * ref.
             *
            setTimeout(() => {
                this.message.forEach((message)=>{
                    message.days = 30;
                })
            });
            */
            this.message.forEach((message)=>{
                message.days = 30;
            });
            //  
            // 
            /**
             * The following
             * this.cd.detectChanges();
             * won't make angular to do the
             * additional check that is throwing the error.
             * This is a way we can use the change detector 
             * to say that a change has been made after the
             * view has been initialized.
             */
            this.cd.detectChanges();
        }
        // this causing an error saying, 
        /**
         * Error: ExpressionChangedAfterItHasBeenCheckedError: 
         * Expression has changed after it was checked.    
         * Previous value: '7'. Current value: '30'.
         * 
         * This is because the content Child acts slightly 
         * different when is inside the AfterContentInit than
         * the viewChild that we configured does.
         * 
         * Angular change detections works in a specific way
         * during development that will actually check the
         * properties twice to make sure we are not making
         * any mistakes. 
         * We had the value preset to 7 and we changed it 
         * for 30, and Angular does this because basically 
         * this it goes
         * against the principle of UNIDIRECTIONAL DATAFLOW,
         * because we are changing somthing after the view
         * has been initialized. 
         * So we need to use the ngAfterContentInit because 
         * is the life cycle hook that is called after the 
         * content has been projected 
         * been projected 
         */
        // this.message.days = 30;
    }
    
    ngAfterContentInit() {
        /**
         * we have a content child (remember), 
         * and then we check its existance
         */
        if(this.remember){
            /**
             * We subscribe to its check output when this check output changes
             * we then get the new value passed in, and then we update a local
             * property inside here called "showMessage: boolean"
             */
            
            //this.remember.checked.subscribe((checked: boolean)=> {this.showMessage = checked;})
            this.remember.forEach( (item)=> {
                item.checked.subscribe((checked: boolean) => this.showMessage = checked);
            }) ; 
        }
    }
    
    onSubmit(value: User) {
        this.submitted.emit(value);
    }
    
}
