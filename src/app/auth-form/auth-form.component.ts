// To accesss to the child component we need ContentChild decorator, 
// and AfterContentInit 
import { Component, Output, EventEmitter, ViewChild, AfterViewInit, ContentChildren, QueryList, AfterContentInit } from '@angular/core';

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
                <ng-content select="button"></ng-content>
            </form>
        </div>

    `
})
export class AuthFormComponent implements AfterContentInit, AfterViewInit {

    showMessage: boolean;
    
    @ViewChild(AuthMessageComponent) message: AuthMessageComponent;

    // Configure the content child query
    @ContentChildren(AuthRememberComponent) remember: QueryList<AuthRememberComponent>;

    @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

    onSubmit(value: User) {
        this.submitted.emit(value);
    }

    ngAfterViewInit() {
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

        if (this.message) {
            this.message.days = 30;
        }

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

    
}

/* Implementation Comments *
 * you learn how to create a view child
 * query where we using the AuthMessageComponent 
 * 
 * @ViewChild(AuthMessageComponent) message: 
 *  AuthMessageComponent;
 * 
 * and we are binding it to a local variable called
 * message. 
 * It's a view child because it lives in the existing 
 * view of the component and it is not projected because
 * we'd call it ContentChild. 
 * 
 * Optionally we can use the ngAfterViewInit() to setup
 * something like a subscription, however if we want to 
 * change a particular data before the view has been 
 * initialized then WE WANT TO USE ngAfterContentInit() 
 * where we do a safety check and where we set the value
 * 
 *    if (this.message) {
 *       this.message.days = 30;
 *    }
 * 
 */