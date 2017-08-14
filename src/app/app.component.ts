import { Component } from '@angular/core';
import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <auth-form (submitted)="createUser($event)">
        <h3>Create Account</h3>
      </auth-form>
      <auth-form (submitted)="loginUser($event)">
        <h3>Login</h3>
      </auth-form>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  createUser(user: User) {
    console.log('Create account', user);
  }
  loginUser(user: User) {
    console.log('Login', user);
    
  }

}
