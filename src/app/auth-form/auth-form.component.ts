// To accesss to the child component we need ContentChild decorator, 
// and AfterContentInit 
import { Component, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';

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
                <div *ngIf="showMessage">
                    <!--we can listen to changes of our content by querying 
                    the content through something called the content child,
                    what we can do with ng-content is look what is in iside 
                    this particular form and listen for those changes and 
                    talk to the projected content directly -->
                    You will be logged in for 30 days
                </div>
                <ng-content select="button"></ng-content>
            </form>
        </div>

    `
})
export class AuthFormComponent implements AfterContentInit {

    showMessage: boolean;

    // Configure the content child query
    @ContentChildren(AuthRememberComponent) remember: QueryList<AuthRememberComponent>;

    @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

    onSubmit(value: User) {
        this.submitted.emit(value);
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
            console.log(this.remember);
            
        }
    }
}