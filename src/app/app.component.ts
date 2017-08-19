import { Component, ViewContainerRef, ComponentRef, ViewChild, ComponentFactoryResolver, AfterContentInit } from '@angular/core';
import { User } from './auth-form/auth-form.interface';

import { AuthFormComponent } from './auth-form/auth-form.component';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <button (click)="destroyComponent()">Destroy</button>
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
   * to intantiate the component and use the ViewContainerRef 
   * to create the component an inject it to the template 
   * here <div #entry></div>
   */
  ngAfterContentInit() {

    const authFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent);

    this.component = this.entry.createComponent(authFormFactory);

    // we can override the title property using the component instance
    this.component.instance.title = 'Create account'; 
    // subscribe to the output
    this.component.instance.submitted.subscribe((this.loginUser));
    /* add entryComponents in the module *
     * we may see the following:
     * 
     * ERROR Error: No component factory found for 
     * AuthFormComponent. Did you add it to 
     * @NgModule.entryComponents.
     * 
     * So if we adding dynamically components the way we 
     * are doing it now, we need to open the auth form module,
     * and we need to use the entryComponents option.
     */

  
  
  
  
  
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
