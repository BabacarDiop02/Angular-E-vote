import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {/* @vite-ignore */ PdfViewerModule} from 'ng2-pdf-viewer';
import {Candidate} from '../../../models/candidate.model';
import {CandidateService} from '../../../services/candidate/candidate.service';

@Component({
  selector: 'app-candidat-infos',
  imports: [
    NgIf,
    PdfViewerModule
  ],
  templateUrl: './candidat-infos.component.html',
  standalone: true,
  styleUrl: './candidat-infos.component.css'
})
export class CandidatInfosComponent implements OnInit{
  activeTab: string = 'portrait';
  candidate!: Candidate;

  constructor(public candidateService: CandidateService) {}

  ngOnInit(): void {
    this.candidate = history.state;
  }
}
