import {Component, OnInit} from '@angular/core';
import {Candidate} from '../../../models/candidate.model';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CandidateService} from '../../../services/candidate/candidate.service';
import {Router} from '@angular/router';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-add-candidate',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './add-candidate.component.html',
  standalone: true,
  styleUrl: './add-candidate.component.css'
})
export class AddCandidateComponent implements OnInit {
  candidateForm!: FormGroup;
  fileProgram: File | null = null;
  imageCandidate: File | null = null;

  constructor(private candidateService: CandidateService,
              private router: Router,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.candidateForm = this.formBuilder.group({
      id: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [25, [Validators.required, Validators.min(25), Validators.max(75)]],
      occupation: ['', Validators.required],
      portrait: [''],
      voice: [null],
      programNameFile: [null],
      profileNameImage: [null],
    });
  }

  onFileSelected(event: Event, field: string) {
    const file = (event.target as HTMLInputElement).files?.[0] || null;
    if (field === 'fileProgram') {
      this.fileProgram = file;
    } else if (field === 'imageCandidate') {
      this.imageCandidate = file;
    }
  }

  addCandidate() {
    if (!this.fileProgram || !this.imageCandidate) {
      alert("Veuillez seléctionner les fichiers");
      return;
    } else {
      if (this.candidateForm.valid) {
        const formData = new FormData();
        formData.append('candidateDTO', new Blob([JSON.stringify(this.candidateForm.value)], {type: 'application/json'}));
        formData.append('fileProgram', this.fileProgram);
        formData.append('imageCandidate', this.imageCandidate);

        this.candidateService.createCandidate(formData).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            console.log("Erreur lors de la création du candidat", err);
          }
        });
      }
    }
  }
}
