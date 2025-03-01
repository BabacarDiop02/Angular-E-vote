import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-inscription',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './inscription.component.html',
  standalone: true,
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  public registrationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.registrationForm = this.formBuilder.group({
      firstName : this.formBuilder.control('', [Validators.required]),
      lastName : this.formBuilder.control('', [Validators.required]),
      nationalIdentificationNumber : this.formBuilder.control('', [Validators.required, Validators.pattern(/^\d{13}$/)]),
      email : this.formBuilder.control('', [Validators.required, Validators.email]),
      password : this.formBuilder.control('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]),
      passwordConfirm : this.formBuilder.control('', [Validators.required]),
    },{
      validators: this.passwordValidator('password', 'passwordConfirm')
    });
  }

  register() {
    const userCredentials = {
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      nationalIdentificationNumber: this.registrationForm.value.nationalIdentificationNumber,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password
    };
    if (this.registrationForm.valid) {
      this.authenticationService.register(userCredentials).subscribe({
        next: () => {
          this.router.navigateByUrl("/valid-code")
        },
        error: (err: Error) => {
          console.error('Erreur de inscription', err);
        }
      })
    }
  }

  passwordValidator(passwordKey: string, passwordConfirmKey: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls[passwordKey];
      const passwordConfirm = formGroup.controls[passwordConfirmKey];

      if (passwordConfirm.errors && !passwordConfirm.errors['mustMatch']) return;

      if (password.value !== passwordConfirm.value) {
        passwordConfirm.setErrors({ mustMatch: true });
      } else {
        passwordConfirm.setErrors(null);
      }
    }
  }
}
