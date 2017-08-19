import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthFormComponent } from './auth-form.component';
import { AuthRememberComponent } from "./auth-remember.component";
import { AuthMessageComponent } from "./auth-message.component";

@NgModule({
    declarations: [
        AuthFormComponent,
        AuthRememberComponent,
        AuthMessageComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        AuthFormComponent,
        AuthRememberComponent
    ],
    entryComponents: [ 
        AuthFormComponent // when we need dynamic components we need to use 
                          // entryComponents:[] 
                          // telling this is the dynamic component which may
                          // not be compiled at runtime but later on in our
                          // application.
    ]
})
export class AuthFormModule {
}
