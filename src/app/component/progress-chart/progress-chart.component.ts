import {Component, Input, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-progress-chart',
  templateUrl: './progress-chart.component.html',
  standalone: true,
  imports: [
    DecimalPipe
  ],
  styleUrl: './progress-chart.component.css'
})
export class ProgressChartComponent implements OnInit {
  @Input() chartId!: string;  // ID unique du graphique
  @Input() percentage!: number;  // Pourcentage à afficher
  @Input() labels!: string[];  // Libellés des données (ex: ["Électeurs inscrits", "Électeurs"])
  @Input() values!: number[];  // Valeurs des données (ex: [20, 80])
  @Input() title!: string;

  chart: any;

  ngOnInit() {
    setTimeout(() => {
      this.createChart();
    }, 100);
  }

  createChart() {
    const canvas = document.getElementById(this.chartId) as HTMLCanvasElement;

    if (!canvas) {
      console.error(`Canvas with ID ${this.chartId} not found`);
      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error(`Failed to get 2D context for canvas with ID ${this.chartId}`);
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.labels,
        datasets: [{
          data: this.values,
          backgroundColor: ['#0C5EB7', '#E58A20'],
          borderWidth: 0
        }]
      },
      options: {
        cutout: '75%',
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'start',
            labels: {
              font: { size: 12 },
              color: '#333'
            }
          }
        }
      }
    });
  }

}
