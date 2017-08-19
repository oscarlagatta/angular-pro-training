// To accesss to the child component we need ContentChild decorator, 
// and AfterContentInit 
import { Component, Renderer, ChangeDetectorRef, ElementRef, Output,ViewChild, EventEmitter, ViewChildren, AfterViewInit, ContentChildren, QueryList, AfterContentInit } from '@angular/core';

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
                <h3>{{title}}</h3>
                <label>
                    Email Address
                    <input type="email" name="email" ngModel>
                </label>
                <label>
                    Password
                    <input type="password" name="password" ngModel>
                </label>
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    `
})
export class AuthFormComponent   {

    title = 'Login';
   
    @Output() submitted: EventEmitter<User> = new EventEmitter<User>();
    
    onSubmit(value: User) {
        this.submitted.emit(value);
    }
    
}

