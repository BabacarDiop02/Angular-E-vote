import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {/* @vite-ignore */ PdfViewerModule} from 'ng2-pdf-viewer';

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
export class CandidatInfosComponent {
  activeTab: string = 'programme';
  pdfSrc = "DIOMAYE-Programme-2024.pdf";
}
