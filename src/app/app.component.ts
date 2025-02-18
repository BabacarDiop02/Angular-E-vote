import { Component } from '@angular/core';
import {MenuComponent} from './pages/public/menu/menu.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    MenuComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-vote-angular';
}
