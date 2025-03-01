import {Component, OnInit} from '@angular/core';
import {CandidatComponent} from '../../../component/candidat/candidat.component';
import {Router} from '@angular/router';
import {Candidate} from '../../../models/candidate.model';
import {CandidateService} from '../../../services/candidate/candidate.service';

@Component({
  selector: 'app-candidat-list',
  imports: [
    CandidatComponent,
  ],
  templateUrl: './candidat-list.component.html',
  standalone: true,
  styleUrl: './candidat-list.component.css'
})
export class CandidatListComponent implements OnInit{
  candidates!: Candidate[];

  constructor(private candidateService: CandidateService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.candidateService.getAllCandidate().subscribe({
      next: (data) => {
        this.candidates = data;
      },
      error: (error) => {
        console.error("erreur lors de la recuperation des candidates", error);
      }
    });
  }

  informationCandidate(candidate: Candidate): void {
    this.router.navigate(['/candidat-infos'], {state: candidate});
  }
}
