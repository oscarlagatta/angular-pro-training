import { Component } from '@angular/core';
import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <auth-form (submitted)="createUser($event)">
        <h3>Create Account</h3>
        <button type="submit">
          Join user
        </button>
      </auth-form>
      <auth-form (submitted)="loginUser($event)">

        <!-- content child of auth-form -->
        <h3>Login</h3>
        <auth-remember (checked)="rememberUser($event)"></auth-remember>
        <button type="submit">
          Login
        </button>
        <!-- end of content child of auth-form -->
        
      </auth-form>
    </div>

  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /**
   * NOTE:
   * If we were using the checkbox inside any particular api request
   * such as if we want to remember whether the user has been checked in
   * or not, we can bind to a component like in this example.
   * And using a flan inside the component (rememberMe), inside the 
   * loginUser call back we add the (this.rememberMe) to the HTTP request 
   * or pass it to a Service. 
   * It doesn't have to be strictly part of the form, that's where content
   * projection and binding to a component is actually really helpful.
   */
  rememberMe: boolean = false;

  createUser(user: User) {
    console.log('Create account', user);
  }
  loginUser(user: User) {
    console.log('Login', user, this.rememberMe);
  }
  
  rememberUser(remember: boolean){
    this.rememberMe = remember;
  }

}
