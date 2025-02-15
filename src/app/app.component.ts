import { Component } from '@angular/core';
import {TemplateComponent} from './pages/template/template.component';

@Component({
  selector: 'app-root',
  imports: [TemplateComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-vote-angular';
}
