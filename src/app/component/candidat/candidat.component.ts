import {Component, Input} from '@angular/core';
import {Candidate} from '../../models/candidate.model';
import {CandidateService} from '../../services/candidate/candidate.service';

@Component({
  selector: 'app-candidat',
  imports: [],
  templateUrl: './candidat.component.html',
  standalone: true,
  styleUrl: './candidat.component.css'
})
export class CandidatComponent {
  @Input() candidat: Candidate = new Candidate();
  constructor(public candidateService: CandidateService) {
  }
}
