import {Component, computed, inject, Input, signal} from '@angular/core';
import {Covoiturage} from '../../../../core/models/covoiturage.model';
import {CovoiturageService} from '../../../covoiturages/covoiturage.service';
import Swal from 'sweetalert2';
import {NgClass} from '@angular/common';
import {Avis} from '../../../../core/models/avis.model';

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

  readonly historiquePassager = signal<Covoiturage[]>([]);
  private openTrajets = signal<number[]>([]);

  loadHistorique() {
    this.covoiturageService.getHistoriquePassager().subscribe({
      next: (data: Covoiturage[])  => this.historiquePassager.set(data),
      error: () => Swal.fire({ icon: 'error', title: 'Erreur', text: 'Échec lors du chargement', confirmButtonColor: '#4caf50' })
    });
  }

  constructor() {
    console.log('cov')
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


  // Tri décroissant par date
  readonly covoituragesParStatut = computed(() => {
    const list = this.historiquePassager();
    console.log(list)
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
  protected readonly Math = Math;

  readonly pageCovoiturage = signal<Record<string, number>>({
    OUVERT: 1,
    EN_COURS: 1,
    TERMINE: 1,
    ANNULE: 1
  });
  @Input() roleEcoride!: "PASSAGER" | "CHAUFFEUR" | "BOTH";

  changerPageCovoiturage(statut: string, page: number) {
    this.pageCovoiturage.update(current => ({
      ...current,
      [statut]: page
    }));
  }
  async laisserAvis(covoiturageId: number) {
    Swal.fire({
      title: 'Votre retour sur ce trajet',
      html:
          `
      <div class="text-start">
        <label class="form-label fw-bold">Le trajet s'est-il bien passé ?</label><br/>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="statutAvis" id="avisOui" value="true" checked>
          <label class="form-check-label" for="avisOui">Oui</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="statutAvis" id="avisNon" value="false">
          <label class="form-check-label" for="avisNon">Non</label>
        </div>
      </div>

      <div class="form-group text-start mt-3">
        <label class="form-label fw-bold">Votre commentaire</label>
        <textarea id="commentaire" class="form-control" rows="3" placeholder="Racontez-nous..."></textarea>
      </div>

      <div class="form-group text-start mt-3">
        <label class="form-label fw-bold">Note</label><br/>
        <div id="etoiles">
            <i class="star bi bi-star-fill" data-value="1"></i>
            <i class="star bi bi-star-fill" data-value="2"></i>
            <i class="star bi bi-star-fill" data-value="3"></i>
            <i class="star bi bi-star-fill" data-value="4"></i>
            <i class="star bi bi-star-fill" data-value="5"></i>
        </div>
      </div>
      `,
      focusConfirm: false,
      confirmButtonText: 'Envoyer',
      confirmButtonColor: '#4caf50',
      showCancelButton: true,
      preConfirm: () => {
        const statut = document.querySelector<HTMLInputElement>('input[name="statutAvis"]:checked')?.value === 'true';
        const commentaire = (document.getElementById('commentaire') as HTMLTextAreaElement)?.value ?? '';
        const note = document.querySelectorAll('.star.selected').length;

        return {
          covoiturageId,
          statut,
          commentaire,
          note: +note
        };
      },
      didOpen: () => {
        const stars = document.querySelectorAll<HTMLElement>('#etoiles .star');

        stars.forEach((star, idx) => {
          const value = +star.dataset['value']!;

          // Hover effect
          star.addEventListener('mouseover', () => {
            stars.forEach(s => s.classList.remove('hovered'));
            for (let i = 0; i < value; i++) {
              stars[i].classList.add('hovered');
            }
          });

          star.addEventListener('mouseout', () => {
            stars.forEach(s => s.classList.remove('hovered'));
          });

          // Click selection
          star.addEventListener('click', () => {
            stars.forEach(s => s.classList.remove('selected'));
            for (let i = 0; i < value; i++) {
              stars[i].classList.add('selected');
            }
          });
        });
      }
    }).then(result => {
      console.log(result)
      if (result.isConfirmed && result.value) {
        const avis: Avis = result.value;
        console.log(avis);
        this.covoiturageService.envoyerAvis(avis).subscribe({
          next: () => {
            this.loadHistorique();
            Swal.fire({
              icon: 'success',
              title: 'Merci pour votre retour !',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: "Impossible d'émettre un avis pour le moment",
              confirmButtonColor: '#4caf50'
            });
          }
        });
      }
    });
  }


}
