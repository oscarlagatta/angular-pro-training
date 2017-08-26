import { Component, OnInit } from '@angular/core';

interface File {
  name: string;
  size: number;
  type: string;
}

@Component({
  selector: 'app-root',
  template: `
  
    <div>
      <stock-inventory></stock-inventory>
    </div>
  `
})
export class AppComponent {}

