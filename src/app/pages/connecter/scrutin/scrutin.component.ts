import { Component } from '@angular/core';
import {DatePipe, NgForOf} from '@angular/common';
import {Election} from '../../../models/election.model';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-scrutin',
  imports: [
    DatePipe,
    NgForOf,
    RouterLink
  ],
  templateUrl: './scrutin.component.html',
  standalone: true,
  styleUrl: './scrutin.component.css'
})
export class ScrutinComponent {
  elections!: Election[];


}
