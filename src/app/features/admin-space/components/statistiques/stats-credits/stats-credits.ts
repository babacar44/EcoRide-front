import {Component, inject, signal} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-stats-credits',
  imports: [],
  templateUrl: './stats-credits.html',
  styleUrl: './stats-credits.scss'
})
export class StatsCredits {
  private readonly adminService = inject(AdminService);
  readonly data = signal<{ date: string, totalCredits: number }[]>([]);

  constructor() {
    this.adminService.getStatsCreditsParJour().subscribe(res => {
      this.data.set(res);
      this.initChart();
    });
  }

  initChart() {
    const canvas = document.getElementById('chartCredits') as HTMLCanvasElement;

    const labels = this.data().map(e => e.date);
    const values = this.data().map(e => e.totalCredits);

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Crédits gagnés par la plateforme',
          data: values,
          backgroundColor: '#2196f3'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }
}
