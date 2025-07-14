import {Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CovoiturageService} from '../covoiturage.service';
import {Covoiturage, PreferencesConducteur} from '../../../core/models/covoiturage.model';
import {NgClass} from '@angular/common';
import {AuthService} from '../../../core/services/auth.service';
import {Utilisateur} from '../../../core/models/utilisateur.model';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

@Component({
  selector: 'app-covoiturage-detail',
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './covoiturage-detail.html',
  styleUrl: './covoiturage-detail.scss'
})
export class CovoiturageDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private covoiturageService = inject(CovoiturageService);
  readonly covoiturage = signal<Covoiturage | null>(null);
  readonly searchParams = this.route.snapshot.queryParams;

  readonly preferences = signal<PreferencesConducteur | null>(null);
  readonly avis = signal<string | null>(null);
  readonly auth = inject(AuthService);

  readonly isLoggedIn = computed(() => this.auth.isAuthenticated());
  readonly user = signal<Utilisateur | null>(null);
  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // On récupère la liste complète déjà chargée
    const covoiturages = this.covoiturageService.covoiturages(); // <-- signal global

    const selected = covoiturages.find(c => c.covoiturageId === id);

    if (selected) {
      this.covoiturage.set(selected);
      // Mock préférences
      this.preferences.set({
        musique: Math.random() > 0.3,
        fumeur: Math.random() > 0.7,
        animaux: Math.random() > 0.5
      });

      // Mock avis
      this.avis.set(
        Math.random() > 0.5
          ? "Conducteur ponctuel et agréable."
          : "Très bon trajet, je recommande !"
      );
    } else {
      // fallback : appel API si besoin (optionnel)
      console.warn('Covoiturage non trouvé dans la liste');
    }
    if (this.auth.isAuthenticated()){
      console.log("zzzzzzzzzzz")
      this.auth.getUserInfo().subscribe(data => {
        console.log(data)
        this.user.set(data);
      })
    }
  }




  async participer() {
    if (!this.auth.isAuthenticated()) {
      localStorage.setItem('pendingCovoiturage', JSON.stringify(this.covoiturage()));
      localStorage.setItem('redirectAfterLogin', `/covoiturages/${this.covoiturage()?.covoiturageId}`);
      this.router.navigate(['/connexion']);
      return;
    }
    const selected = this.covoiturage();
    const user = this.auth.getUserInfo();

    if (!selected || !user) return;

    const prix = selected.prixPersonne;

    const result1 = await Swal.fire({
      title: 'Confirmer la participation',
      text: `Ce trajet vous coûtera ${prix} crédits. Voulez-vous continuer ?`,
      icon: 'question',
      confirmButtonText: 'Oui',
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

    if (!result1.isConfirmed) return;

    const result2 = await Swal.fire({
      title: 'Confirmation définitive',
      text: 'Confirmez-vous votre participation ?',
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

    this.covoiturageService
      .participerAuCovoiturage(selected.covoiturageId)
      .subscribe({
        next: async () => {
          await Swal.fire({
            icon: 'success',
            title: 'Participation enregistrée !',
            timer: 2000,
            showConfirmButton: false,
            customClass: {
              popup: 'swal-popup',
              title: 'swal-title'
            }
          });

          // Mise à jour locale
          this.user.update(user => ({
            ...user!,
            credit: user!.credit - selected.prixPersonne
          }));
          this.covoiturage.update(c => ({
            ...c!,
            nbPlace: c!.nbPlace - 1
          }));
        },
        error: async (err) => {
          console.log(err)
          await Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: err.error.message,
            confirmButtonColor: '#4caf50'
          });
        }
      });
  }



  canParticipate() {
    const selected = this.covoiturage()
    return (
          selected != null &&
           // @ts-ignore
          this.afficherMessageSiCreditInsuffisant()
    );
  }

  afficherMessageSiCreditInsuffisant() {
    if (this.auth.isAuthenticated()){
      const selected = this.covoiturage()
      return (
        // @ts-ignore
        this.user().credit >= selected.prixPersonne
      );
    }else {
      return true;

    }
  }
}
