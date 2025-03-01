import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-validation-compte',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './validation-compte.component.html',
  standalone: true,
  styleUrl: './validation-compte.component.css'
})
export class ValidationCompteComponent implements OnInit {
  public codeForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.focus();

    this.codeForm = this.formBuilder.group(
      Object.fromEntries(
        Array.from({ length: 6 }, (_, i) => [
          `code${i + 1}`, ['', [Validators.required, Validators.pattern(/^\d{1}$/)]]
        ])
      )
    );
  }

  valid(): void {
    const code = this.getCode();
    this.authenticationService.activation(code).subscribe({
      next: () => {
        this.router.navigateByUrl("/register-success")
      }
    })
  }

  getCode(): string {
    return Object.values(this.codeForm.value).join('');
  }

  private focus() {
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.code-input');

    inputs.forEach((input, index) => {
      input.addEventListener('input', (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.value.length === 1 && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });

      // Quand on appuie sur la touche "Backspace"
      input.addEventListener('keydown', (e: KeyboardEvent) => {
        const target = e.target as HTMLInputElement;
        if (e.key === 'Backspace' && target.value === '' && index > 0) {
          inputs[index - 1].focus();
        }
      });
    });
  }
}
