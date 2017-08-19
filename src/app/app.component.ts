import { Component, ViewContainerRef, ComponentRef, ViewChild, ComponentFactoryResolver, AfterContentInit } from '@angular/core';
import { User } from './auth-form/auth-form.interface';

import { AuthFormComponent } from './auth-form/auth-form.component';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <button (click)="destroyComponent()">Destroy</button>
       <button (click)="moveComponent()">Move</button>
      <div #entry></div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit{

  component: ComponentRef<AuthFormComponent>;

  // the read property changes what we get back, 
  // ViewContainerRef will give us a different lookup token
  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;

  /* ComponentFactoryResolver *
   * 
   * @param resolver Allows us to create a component factory based on the dinamic component we've imported 
   * 'AuthFormComponent' and we will use the ViewContaineRef 
   * #entry to allow us to create a component in the particular
   * <div #entry>.
   * Because we are using ViewChild we also need to add another
   * Life Cycle hook 'AfterContentInit', we want to do this 
   * with the AfterContentInit rather than the AfterViewInit 
   * because we can setup our components and subscribe to the
   * outputs and change the data before the actual view has 
   * been initialized.  
   */
  constructor(
    private resolver: ComponentFactoryResolver
  ){}

  /* Resolver *
   * Here we can use the resolver and the entry ViewChild
   * to instantiate the component and use the ViewContainerRef 
   * to create the component an inject it to the template 
   * here <div #entry></div>
   */
  ngAfterContentInit() {

    const authFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent);
    this.entry.createComponent(authFormFactory); // default index of -1
    /**
     * if I want to put the component in a different order we 
     * use the index parameter of the createComponent
     */
    this.component = this.entry.createComponent(authFormFactory, 0);
    this.component.instance.title = 'Create account'; 
    this.component.instance.submitted.subscribe((this.loginUser));
    
    }

  moveComponent() {
    /** we use the entry which is the ViewContainerRef which is 
     * using the ViewChild
    */
    this.entry.move(this.component.hostView, 1);

  }

  loginUser(user: User) {
    console.log('Login', user);
  }  

  destroyComponent(){
    this.component.destroy();
  }

}


/* Implementation details *
 * 
 * To create a dynamic component we need to setup an entry point 
 * like <div #entry></div> 
 * We use a ViewContainerRef, we need to inject the ComponentFactoryResolver,
 * we then create an instance of that component 
 * const authFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent);
 * const component = this.entry.createComponent(authFormFactory);
 * 
 * It's broken down into Const(ants) so we can create more than one instance of the
 * same component. So if we create it multiple times we can rename it like this
 * 
 * const component2 = this.entry.createComponent(authFormFactory);
 * const component3 = this.entry.createComponent(authFormFactory);
 * const component4 = this.entry.createComponent(authFormFactory);
 * 
 * 
 * And the fact we are using 'read' as ViewContainerRef switching to a 
 * ViewContainerRef instead of an ElementRef, enables us to create a 
 * particular component. (entry.createComponent)
 * 
 */
