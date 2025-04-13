import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Chart, registerables, CategoryScale, LinearScale, BarController, BarElement} from 'chart.js';
import {Candidate} from '../../../models/candidate.model';
import {CandidateService} from '../../../services/candidate/candidate.service';

Chart.register(...registerables, CategoryScale, LinearScale, BarController, BarElement);

@Component({
  selector: 'app-gestion-resultat',
  imports: [],
  templateUrl: './gestion-resultat.component.html',
  standalone: true,
  styleUrl: './gestion-resultat.component.css'
})
export class GestionResultatComponent implements AfterViewInit {
  public candidates: Candidate[] = [];
  chart: any;

  constructor(private candidateService: CandidateService) {
  }

  ngAfterViewInit(): void {
    this.candidateService.getAllCandidate().subscribe(data => {
      this.candidates = data;
      this.createChart();
    });
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    // Générer des couleurs dynamiquement
    const generateColors = (num: number) => {
      return Array.from({ length: num }, () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgba(${r}, ${g}, ${b}, 0.6)`;
      });
    };

    const backgroundColors = generateColors(this.candidates.length);
    const borderColors = backgroundColors.map(color => color.replace('0.6', '1')); // Opacité 1 pour la bordure

    this.chart = new Chart("histogramChart", {
      type: 'bar',
      data: {
        labels: this.candidates.map(c => c.firstName + ' ' + c.lastName),
        datasets: [{
          label: 'Nombre de voix',
          data: this.candidates.map(c => c.voice),
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            ticks: {
              color: borderColors // Appliquer les couleurs aux labels
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
