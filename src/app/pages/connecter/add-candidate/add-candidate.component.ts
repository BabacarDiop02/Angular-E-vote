import {Component, OnInit} from '@angular/core';
import {Candidate} from '../../../models/candidate.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CandidateService} from '../../../services/candidate/candidate.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-candidate',
  imports: [],
  templateUrl: './add-candidate.component.html',
  standalone: true,
  styleUrl: './add-candidate.component.css'
})
export class AddCandidateComponent implements OnInit {
  private candidate!: Candidate;
  candidateForm!: FormGroup;

  constructor(private candidateService: CandidateService,
              private router: Router,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.candidateForm = this.formBuilder.group({
      id: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.pattern(/^\d{1}$/)]],
      occupation: ['', Validators.required],
      portrait: ['', Validators.required],
      programNameFile: [''],

    })
  }
}
