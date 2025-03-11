import {Component, OnInit} from '@angular/core';
import {Candidate} from '../../../models/candidate.model';
import {CandidateService} from '../../../services/candidate/candidate.service';
import {VoteService} from '../../../services/vote/vote.service';
import {DecimalPipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-resultat',
  imports: [
    NgClass,
    DecimalPipe
  ],
  templateUrl: './resultat.component.html',
  standalone: true,
  styleUrl: './resultat.component.css'
})
export class ResultatComponent implements OnInit {
  candidates!: Candidate[];
  allVotes: number = 0;

  constructor(public candidateService: CandidateService,
              private voteService: VoteService) {
  }

  ngOnInit(): void {
    this.voteService.allVotesCount().subscribe(count => this.allVotes = count);
    // ****************************************************************************
    this.candidateService.getAllCandidate().subscribe({
      next: (data) => {
        this.candidates = data.sort((a, b) => b.voice - a.voice);
      },
      error: (error) => {
        console.error("erreur lors de la recuperation des candidates", error);
      }
    });
  }

  getProgressClass(score: number): string {
    if (score >= 70) {
      return 'text-success';
    } else if (score >= 30) {
      return 'text-warning';
    } else {
      return 'text-danger';
    }
  }
}
