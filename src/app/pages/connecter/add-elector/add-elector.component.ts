import {Component, effect, OnInit} from '@angular/core';
import {Elector} from '../../../models/elector.model';
import {ElectorService} from '../../../services/elector/elector.service';
import {Router} from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-add-elector',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './add-elector.component.html',
  standalone: true,
  styleUrl: './add-elector.component.css'
})
export class AddElectorComponent implements OnInit {
  private elector!: Elector;
  electorForm!: FormGroup;
  updateElector: boolean = false;

  constructor(private electorService: ElectorService,
              private router: Router,
              private formBuilder: FormBuilder) {
    effect(() => {
      const data = this.electorService.selectedRow();
      console.log("Données reçues :", data);
      if (data) {
        this.updateElector = true;
        const formattedData = {
          ...data,
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : ''
        };

        this.electorForm.patchValue(formattedData);
      } else {
        this.electorForm.reset();
      }
    });
  }

  ngOnInit(): void {
    this.electorForm = this.formBuilder.group({
      id: [null],
      nationalIdentificationNumber: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]], // Exemple de NIN au Sénégal
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, this.ageValidator()]],
      placeOfBirth: ['', Validators.required],
      voterNumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      region: ['', Validators.required],
      department: ['', Validators.required],
      borough: ['', Validators.required],
      town: ['', Validators.required],
      votingPlace: ['', Validators.required],
      pollingStation: [null, [Validators.required, Validators.min(1)]]
    });
  }

  addElecetor() {
    if (this.electorForm.valid) {
      this.elector = this.electorForm.value;

      this.electorService.createElector(this.elector).subscribe({
        next: (data) => {
          console.log(data)
          this.router.navigate(['/connecter/gestion-electeur']);
        },
        error: (error) => {
          console.error("Erreur lors de la création d'un l'électeurs", error);
        }
      });
    }
  }

  ageValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthDate = control.value;
      const currentDate = new Date();
      const minAgeDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 18));

      if (birthDate && birthDate > minAgeDate) {
        return {'ageInvalid': true};
      }
      return null;
    };
  }

  updatedElecetor() {
    if (this.electorForm.valid) {
      this.elector = this.electorForm.value;

      this.electorService.updatedElector(this.elector).subscribe({
        next: (data) => {
          console.log(data)
          this.router.navigate(['/connecter/gestion-electeur']);
        },
        error: (error) => {
          console.error("Erreur lors de modification de l'électeurs", error);
        }
      });
    }
  }
}
