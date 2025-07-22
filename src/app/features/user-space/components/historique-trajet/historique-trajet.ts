import {Component, computed, inject, Input, signal} from '@angular/core';
import {Covoiturage} from '../../../../core/models/covoiturage.model';
import Swal from 'sweetalert2';
import {CovoiturageService} from '../../../covoiturages/covoiturage.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-historique-trajet',
  imports: [
    NgClass
  ],
  templateUrl: './historique-trajet.html',
  styleUrl: './historique-trajet.scss'
})
export class HistoriqueTrajet {
  protected readonly Math = Math;
  private openTrajets = signal<number[]>([]);

  private covoiturageService = inject(CovoiturageService);

  readonly pageCovoiturage = signal<Record<string, number>>({
    OUVERT: 1,
    EN_COURS: 1,
    TERMINE: 1,
    ANNULE: 1
  });
  readonly trajetsParStatut = computed(() => {
    const list = this.historiqueConducteur();
    const byStatut: Record<string, Covoiturage[]> = {
      OUVERT: [],
      EN_COURS: [],
      TERMINE: [],
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
  readonly historiqueConducteur = signal<Covoiturage[]>([]);
  @Input() roleEcoride!: "PASSAGER" | "CHAUFFEUR" | "BOTH";

  constructor() {
    console.log('trajet')
    this.loadHistorique();
  }

  loadHistorique() {
    this.covoiturageService.getHistoriqueConducteur().subscribe({
      next: (data: Covoiturage[])  => this.historiqueConducteur.set(data),
      error: () => Swal.fire({ icon: 'error', title: 'Erreur', text: 'Échec lors du chargement', confirmButtonColor: '#4caf50' })
    });
  }

  async demarrerCovoiturage(trajet: Covoiturage) {
    const result2 = await Swal.fire({
      title: 'Démarrer le trajet',
      text: 'Confirmez-vous le démarrage ?',
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
    this.covoiturageService.demarrer(trajet).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Trajet démarré !',
          confirmButtonColor: '#4caf50'
        });
        this.loadHistorique();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de démarrer le trajet.',
          confirmButtonColor: '#4caf50'
        });
      }
    });
  }

  async terminerCovoiturage(trajet: Covoiturage) {
    const result2 = await Swal.fire({
      title: 'Terminer le trajet',
      text: 'Confirmez-vous la fin du trajet ?',
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
    this.covoiturageService.terminer(trajet).subscribe({
      next: () => {
        this.loadHistorique();
        Swal.fire({
          icon: 'success',
          title: 'Trajet terminé !',
          text: 'Les passagers ont été notifiés.',
          confirmButtonColor: '#4caf50'
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de clôturer le trajet.',
          confirmButtonColor: '#4caf50'
        });
      }
    });
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
  toggleDetails(id: number) {
    const current = this.openTrajets();
    this.openTrajets.set(
      current.includes(id) ? current.filter(i => i !== id) : [...current, id]
    );
  }

  isOpen(id: number): boolean {
    return this.openTrajets().includes(id);
  }

  changerPageCovoiturage(statut: string, page: number) {
    this.pageCovoiturage.update(current => ({
      ...current,
      [statut]: page
    }));
  }

}
