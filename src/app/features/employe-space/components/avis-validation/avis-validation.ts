import {Component, inject, signal} from '@angular/core';
import {EmployeService} from '../../services/employe-service';
import Swal from 'sweetalert2';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-avis-validation',
  imports: [
    NgClass
  ],
  templateUrl: './avis-validation.html',
  styleUrl: './avis-validation.scss'
})
export class AvisValidation {
  private employeService = inject(EmployeService);

  readonly avis = signal<any[]>([]);
  readonly openAvis = signal<number[]>([]);
  readonly currentPage = signal(1);
  readonly perPage = 5;

  constructor() {
    this.chargerAvis();
  }

  chargerAvis() {
    this.employeService.getAvisEnAttente().subscribe({
      next: (data) => this.avis.set(data),
      error: () => Swal.fire({ icon: 'error', title: 'Erreur', text: 'Chargement des avis impossible' })
    });
  }

  totalPages() {
    return Array.from({ length: Math.ceil(this.avis().length / this.perPage) }, (_, i) => i + 1);
  }

  avisPagines() {
    const start = (this.currentPage() - 1) * this.perPage;
    return this.avis().slice(start, start + this.perPage);
  }

  changerPage(page: number) {
    this.currentPage.set(page);
  }

  toggleDetails(id: number) {
    const current = this.openAvis();
    this.openAvis.set(
      current.includes(id) ? current.filter(i => i !== id) : [...current, id]
    );
  }

  isOpen(id: number) {
    return this.openAvis().includes(id);
  }

  validerAvis(id: number) {
    this.employeService.validerAvis(id).subscribe({
      next: () => {
        Swal.fire({ icon: 'success', title: 'Avis validé !', timer: 1500, showConfirmButton: false });
        this.chargerAvis();
      },
      error: () => Swal.fire({ icon: 'error', title: 'Erreur', text: 'Impossible de valider cet avis' })
    });
  }
}
