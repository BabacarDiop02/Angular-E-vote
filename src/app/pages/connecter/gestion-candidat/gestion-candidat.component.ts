import { Component } from '@angular/core';
import {AddCandidateComponent} from '../add-candidate/add-candidate.component';

@Component({
  selector: 'app-gestion-candidat',
  imports: [
    AddCandidateComponent
  ],
  templateUrl: './gestion-candidat.component.html',
  standalone: true,
  styleUrl: './gestion-candidat.component.css'
})
export class GestionCandidatComponent {

}
