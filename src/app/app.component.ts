import { Component, ViewContainerRef, ComponentRef,TemplateRef, ViewChild, ComponentFactoryResolver, AfterContentInit } from '@angular/core';
import { User } from './auth-form/auth-form.interface';

import { AuthFormComponent } from './auth-form/auth-form.component';

@Component({
  selector: 'app-root',
  template: `
      <ng-container 
        [ngTemplateOutlet]="tmpl"
        [ngTemplateOutletContext]="ctx">
      </ng-container>
      <ng-template #tmpl let-name let-location="location">
        {{ name }}: {{ location }}
      <ng-template>
  `
})
export class AppComponent {

    ctx = {
      $implicit: 'Oscar Lagatta',
      location: 'England, UK'
    }
  
}

