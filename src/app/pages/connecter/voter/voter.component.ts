import {ChangeDetectionStrategy, Component, Inject, inject, OnInit} from '@angular/core';
import {CandidatComponent} from '../../../component/candidat/candidat.component';
import {Candidate} from '../../../models/candidate.model';
import {CandidateService} from '../../../services/candidate/candidate.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatDivider} from '@angular/material/divider';
import {VoteService} from '../../../services/vote/vote.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-voter',
  imports: [
    CandidatComponent,
    MatTooltipModule,
    NgIf
  ],
  templateUrl: './voter.component.html',
  standalone: true,
  styleUrl: './voter.component.css'
})
export class VoterComponent implements OnInit {
  candidates!: Candidate[];
  readonly dialog = inject(MatDialog);
  hasVoted: boolean = false;

  constructor(private candidateService: CandidateService,
              public voteService: VoteService) {
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

    this.checkIfUserVoted();
  }

  checkIfUserVoted(): void {
    this.voteService.hasVoted().subscribe({
      next: (response) => {
        this.hasVoted = response;
      },
      error: (err) => {
        console.error("Erreur lors de la vérification du vote :", err);
      }
    });
  }

  voteDialog(enterAnimationDuration: string, exitAnimationDuration: string, candidate: Candidate): void {
    this.dialog.open(DialogAnimationsVoter, {
      data: { state: candidate },
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

@Component({
  selector: 'dialog-animations-voter',
  templateUrl: 'dialog-animations-voter.html',
  styleUrl: 'dialog-animations-voter.css',
  imports: [MatButtonModule, MatDialogModule, MatDivider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class DialogAnimationsVoter {
  candidate!: Candidate;

  constructor(public candidateService: CandidateService,
              public voteService: VoteService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.candidate = data.state;
  }
}
