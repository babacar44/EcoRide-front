import {Component, inject, signal} from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-stats-covoiturages',
  imports: [],
  templateUrl: './stats-covoiturages.html',
  styleUrl: './stats-covoiturages.scss'
})
export class StatsCovoiturages {
  private readonly adminService = inject(AdminService);
  readonly data = signal<{ date: string, total: number }[]>([]);

  constructor() {
    this.adminService.getStatsCovoituragesParJour().subscribe(stats => {
      this.data.set(stats);
      this.initChart();
    });
  }

  initChart() {
    const ctx = document.getElementById('chartCovoiturages') as HTMLCanvasElement;

    const labels = this.data().map(d => d.date);
    const values = this.data().map(d => d.total);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Covoiturages par jour',
          data: values,
          backgroundColor: '#4caf50'
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
