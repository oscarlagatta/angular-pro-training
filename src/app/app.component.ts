import { Component, ViewContainerRef, ComponentRef,TemplateRef, ViewChild, ComponentFactoryResolver, AfterContentInit } from '@angular/core';
import { User } from './auth-form/auth-form.interface';

import { AuthFormComponent } from './auth-form/auth-form.component';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <div #entry></div>

      <template #tmpl let-name let-location="location">
        {{ name }}: {{ location }}
      </template>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit{

  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;
  @ViewChild('tmpl') tmpl: TemplateRef<any>;

  ngAfterContentInit() {
    // because we use template
    this.entry.createEmbeddedView(this.tmpl, {
      $implicit: 'Oscar Lagatta',
      location: 'England, UK'
    });
  }
}

/**
 * we create a template variable under ViewChild tml lookup
 * and create an EmbeddedView passing a particular context 
 * and in the template itself we declare an implicit context 
 * (let-name) and a property that relies on 
 *  
 */