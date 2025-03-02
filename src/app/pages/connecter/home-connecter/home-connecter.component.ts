import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatCard, MatCardContent} from '@angular/material/card';

@Component({
  selector: 'app-home-connecter',
  imports: [
    RouterOutlet,
    MatCard,
    MatCardContent
  ],
  templateUrl: './home-connecter.component.html',
  standalone: true,
  styleUrl: './home-connecter.component.css'
})
export class HomeConnecterComponent {

}
