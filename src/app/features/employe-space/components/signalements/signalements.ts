import {Component, computed, effect, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeService} from '../../services/employe-service';
import {Signalement} from '../../../../core/models/signalement.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signalements',
  imports: [CommonModule],
  templateUrl: './signalements.html',
  styleUrl: './signalements.scss'
})
export class Signalements {
  private employeService = inject(EmployeService);

  readonly signalements = signal<Signalement[]>([]);
  readonly currentPage = signal(1);
  readonly pageSize = 5;

  private readonly expanded = signal<number[]>([]);

  constructor() {
    this.loadSignalements();
  }

  loadSignalements() {
    this.employeService.getSignalements().subscribe({
      next: (data) => this.signalements.set(data),
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de charger les signalements',
          confirmButtonColor: '#4caf50'
        });
      }
    });
  }

  readonly paginatedSignalements = computed(() => {
    const list = this.signalements();
    const start = (this.currentPage() - 1) * this.pageSize;
    return list.slice(start, start + this.pageSize);
  });

  get totalPages(): number {
    return Math.ceil(this.signalements().length / this.pageSize);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage.set(page);
    }
  }

  toggleDetails(id: number) {
    const list = this.expanded();
    this.expanded.set(
      list.includes(id)
        ? list.filter(i => i !== id)
        : [...list, id]
    );
  }

  isOpen(id: number): boolean {
    return this.expanded().includes(id);
  }

  validerSignalement(covoiturageId: number, participationId: number) {
    Swal.fire({
      title: 'Valider ce trajet ?',
      text: 'Cette action attribuera les crédits au chauffeur.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#4caf50',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, valider'
    }).then(result => {
      if (result.isConfirmed) {
        this.employeService.validerTrajet(covoiturageId,participationId).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Validé',
              text: 'Les crédits ont été attribués.',
              confirmButtonColor: '#4caf50'
            });
            this.loadSignalements();
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Impossible de valider ce trajet.',
              confirmButtonColor: '#4caf50'
            });
          }
        });
      }
    });
  }

}
