import {Component, computed, inject, signal} from '@angular/core';
import {Covoiturage} from '../../../../core/models/covoiturage.model';
import {CovoiturageService} from '../../../covoiturages/covoiturage.service';
import Swal from 'sweetalert2';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-historique-covoiturage',
  imports: [
    NgClass
  ],
  templateUrl: './historique-covoiturage.html',
  styleUrl: './historique-covoiturage.scss'
})
export class HistoriqueCovoiturage {
  private covoiturageService = inject(CovoiturageService);

  readonly historiqueConducteur = signal<Covoiturage[]>([]);
  readonly historiquePassager = signal<Covoiturage[]>([]);
  historiqueActiveTrajet= signal(false);
  historiqueActivePassager= signal(false);
  private openTrajets = signal<number[]>([]);

  loadHistorique() {
    this.covoiturageService.getHistoriqueConducteur().subscribe({
      next: (data: Covoiturage[])  => this.historiqueConducteur.set(data),
      error: () => Swal.fire({ icon: 'error', title: 'Erreur', text: 'Échec lors du chargement', confirmButtonColor: '#4caf50' })
    });
    this.covoiturageService.getHistoriquePassager().subscribe({
      next: (data: Covoiturage[])  => this.historiquePassager.set(data),
      error: () => Swal.fire({ icon: 'error', title: 'Erreur', text: 'Échec lors du chargement', confirmButtonColor: '#4caf50' })
    });
  }

  constructor() {
    this.loadHistorique();
  }

  toggleDetails(id: number) {
    const current = this.openTrajets();
    this.openTrajets.set(
      current.includes(id) ? current.filter(i => i !== id) : [...current, id]
    );
  }

  isOpen(id: number): boolean {
    return this.openTrajets().includes(id);
  }

  async annulerCovoiturage(trajet: Covoiturage) {
    const result2 = await Swal.fire({
      title: 'Annulation définitive',
      text: 'Voulez-vous vraiment annuler ce covoiturage ?',
      icon: 'warning',
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      showCancelButton: true,
      confirmButtonColor: '#4caf50',
      cancelButtonColor: '#ccc',
      customClass: {
        title: 'swal-title',
        popup: 'swal-popup',
        confirmButton: 'swal-confirm',
        cancelButton: 'swal-cancel'
      }
    });
    if (!result2.isConfirmed) return;
      this.covoiturageService.annulerCovoiturage(trajet).subscribe({
        next: async () => {
          await Swal.fire({
            icon: 'success',
            title: 'Covoiturage annulé !',
            confirmButtonColor: '#4caf50'
          });
          this.loadHistorique();
        },
          error: async () => {
          await Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur lors de l’annulation',
            confirmButtonColor: '#4caf50'
          });
        }
      });
  }

  async  annulerParticipation(id: number) {

    const result2 = await Swal.fire({
      title: 'Annulation définitive',
      text: 'Confirmez-vous votre annulation ?',
      icon: 'warning',
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      showCancelButton: true,
      confirmButtonColor: '#4caf50',
      cancelButtonColor: '#ccc',
      customClass: {
        title: 'swal-title',
        popup: 'swal-popup',
        confirmButton: 'swal-confirm',
        cancelButton: 'swal-cancel'
      }
    });
    if (!result2.isConfirmed) return;
      this.covoiturageService.annulerParticipation(id).subscribe({
        next: async () => {
          await Swal.fire({
            icon: 'success',
            title: 'Participation annulée !',
            confirmButtonColor: '#4caf50'
          });
          this.loadHistorique();
        },
        error: async () => {
          await Swal.fire({
            icon: 'error',
            title: 'Erreur',
              text: 'Erreur lors de l’annulation',
            confirmButtonColor: '#4caf50'
          });
        }

      });
  }

  activerHistoriqueTrajet() {
    this.historiqueActiveTrajet.set(!this.historiqueActiveTrajet());
  }

  activerHistoriquePassager() {
    this.historiqueActivePassager.set(!this.historiqueActivePassager());
  }

  // Tri décroissant par date
  readonly covoituragesParStatut = computed(() => {
    const list = this.historiquePassager();
    console.log(list)
    const byStatut: Record<string, Covoiturage[]> = {
      OUVERT: [],
      FERME: [],
      ANNULE: []
    };

    for (const covoit of list) {
      const statut = covoit.statut;
      if (!byStatut[statut]) byStatut[statut] = [];

      byStatut[statut].push(covoit);
    }

    for (const key of Object.keys(byStatut)) {
      byStatut[key] = byStatut[key].sort((a, b) =>
        new Date(b.dateDepart).getTime() - new Date(a.dateDepart).getTime()
      );
    }

    return byStatut;
  });
  readonly trajetsParStatut = computed(() => {
    const list = this.historiqueConducteur();
    const byStatut: Record<string, Covoiturage[]> = {
      OUVERT: [],
      FERME: [],
      ANNULE: []
    };

    for (const covoit of list) {
      const statut = covoit.statut;
      if (!byStatut[statut]) byStatut[statut] = [];

      byStatut[statut].push(covoit);
    }

    for (const key of Object.keys(byStatut)) {
      byStatut[key] = byStatut[key].sort((a, b) =>
        new Date(b.dateDepart).getTime() - new Date(a.dateDepart).getTime()
      );
    }

    return byStatut;
  });
  protected readonly Math = Math;

  readonly pageCovoiturage = signal<Record<string, number>>({
    OUVERT: 1,
    FERME: 1,
    ANNULE: 1
  });

  changerPageCovoiturage(statut: string, page: number) {
    this.pageCovoiturage.update(current => ({
      ...current,
      [statut]: page
    }));
  }
}
