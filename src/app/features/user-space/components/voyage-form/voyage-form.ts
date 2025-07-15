import {Component, inject, input, Input, signal} from '@angular/core';
import {Voiture} from '../../../../core/models/voiture.model';
import {UserSpaceService} from '../../services/user-space.service';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {VoyageService} from '../../services/voyage-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-voyage-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './voyage-form.html',
  styleUrl: './voyage-form.scss'
})
export class VoyageForm {
  voitures = input.required<Voiture[]>();
  private readonly voyageService = inject(VoyageService);
  voyageActive = signal(false);

  readonly voyagerFormData = signal({
    lieuDepart: '',
    lieuArrivee: '',
    dateDepart: '',
    dateArrivee: '',
    heureDepart: '',
    heureArrivee: '',
    prixPersonne: 0,
    immatriculation: ''
  });

  envoyer(form: NgForm) {
    if (!form.valid) return;
    const data = this.voyagerFormData();
    if (data.immatriculation && data.lieuDepart && data.lieuArrivee &&
    data.dateDepart && data.heureDepart && data.heureArrivee && data.prixPersonne > 0) {
      this.voyageService.saisirVoyage(data).subscribe({
        next: async () => {
          await Swal.fire({
            icon: 'success',
            title: 'Voyage enregistré !',
            confirmButtonColor: '#4caf50'
          });
          this.voyageActive.set(false);
          this.voyagerFormData.set({
            lieuDepart: '',
            lieuArrivee: '',
            dateDepart: '',
            dateArrivee: '',
            heureDepart: '',
            heureArrivee: '',
            prixPersonne: 0,
            immatriculation: ''
          });
        },
        error: async () => {
          await Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur lors de l’enregistrement du voyage.',
            confirmButtonColor: '#4caf50'
          });
        }
      });
    } else {
      alert('Tous les champs sont requis.');
    }
  }

  activerVoyageForm() {
    this.voyageActive.set(!this.voyageActive());
  }
}
