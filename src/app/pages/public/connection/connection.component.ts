import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-connection',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgClass,
    NgIf,
  ],
  templateUrl: './connection.component.html',
  standalone: true,
  styleUrl: './connection.component.css'
})
export class ConnectionComponent implements OnInit{

  public loginForm!: FormGroup;
  invalidCredentials: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email : this.formBuilder.control('', [Validators.required, Validators.email]),
      password : this.formBuilder.control('', [Validators.required])
    });
  }

  login(): void {
    const userCredentials = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authenticationService.login(userCredentials).subscribe({
      next: () => {
        this.router.navigateByUrl("/connecter")
      },
      error: error => {
        this.invalidCredentials = true;
        console.error('Erreur de connexion', error);
      }
    });
  }
}
