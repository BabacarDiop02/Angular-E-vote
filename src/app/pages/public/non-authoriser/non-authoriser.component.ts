import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-non-authoriser',
  imports: [],
  templateUrl: './non-authoriser.component.html',
  standalone: true,
  styleUrl: './non-authoriser.component.css'
})
export class NonAuthoriserComponent {

}

@Component({
  selector: 'app-register-success',
  imports: [
    RouterLink
  ],
  templateUrl: './register-success.component.html',
  standalone: true,
  styleUrl: './register-success.component.css'
})
export class RegisterSuccessComponent {

}
