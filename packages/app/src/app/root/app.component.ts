import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ContractInteractionComponent } from '../contract-interaction/contract-interaction.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    ContractInteractionComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app';
}
