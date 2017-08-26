import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreditCardDirective } from './credit-card/credit-card.directive';
import { ToolTipDirective } from './tooltip/tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    CreditCardDirective,
    ToolTipDirective
    
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}