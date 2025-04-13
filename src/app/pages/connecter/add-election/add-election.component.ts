import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ElectionStatus, ElectionType} from '../../../models/election.model';
import {CandidateService} from '../../../services/candidate/candidate.service';
import {Candidate} from '../../../models/candidate.model';
import {NgClass, NgForOf, NgIf, UpperCasePipe} from '@angular/common';
import {CandidatComponent} from '../../../component/candidat/candidat.component';
import {TruncatePipe} from '../../../services/template/template.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-add-election',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    CandidatComponent,
    TruncatePipe,
    NgIf,
    NgClass,
    RouterLink,
    UpperCasePipe
  ],
  templateUrl: './add-election.component.html',
  standalone: true,
  styleUrl: './add-election.component.css'
})
export class AddElectionComponent implements OnInit {
  electionForm!: FormGroup;
  electionTypes: ElectionType[] = Object.values(ElectionType);
  electionStatus: ElectionStatus[] = Object.values(ElectionStatus);
  candidates: Candidate[] = [];
  updateElection: boolean = false;
  isUploading: boolean = false;

  constructor(private formBuilder: FormBuilder,
              public candidateService: CandidateService) {}

  ngOnInit(): void {
    this.electionForm = this.formBuilder.group({
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
      candidates: this.formBuilder.array([]),
      allVotes: [0, Validators.min(0)]
    });

    // ✅ Charger les candidats après l'initialisation du formulaire
    this.allCandidate();
  }

  private addCheckboxes() {
    this.candidatesFormArray.clear();
    this.candidates.forEach(() => this.candidatesFormArray.push(this.formBuilder.control(false)));
  }

  get candidatesFormArray(): FormArray {
    return this.electionForm.get('candidates') as FormArray;
  }

  private allCandidate() {
    this.candidateService.getAllCandidate().subscribe({
      next: (data) => {
        this.candidates = Array.from(data);
        console.log("✅ Candidats récupérés :", this.candidates);

        // ✅ Ajouter les checkboxes après avoir récupéré les candidats
        this.addCheckboxes();
      },
      error: (error) => {
        console.error('❌ Erreur lors de la récupération des candidats', error);
      }
    });
  }

  onSubmit() {
    console.log("✅ Formulaire soumis :", this.electionForm.value);
  }
}
