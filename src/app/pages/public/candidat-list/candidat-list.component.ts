import { Component } from '@angular/core';
import {CandidatComponent} from '../../../component/candidat/candidat.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-candidat-list',
  imports: [
    CandidatComponent,
    RouterLink
  ],
  templateUrl: './candidat-list.component.html',
  standalone: true,
  styleUrl: './candidat-list.component.css'
})
export class CandidatListComponent {

}
