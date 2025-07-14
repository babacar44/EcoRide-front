import {Component, inject, signal} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserSpaceService } from './services/user-space.service';
import { UserSpaceForm } from '../../core/models/user-space-form.model';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-space',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-space.html',
  styleUrl: './user-space.scss'
})
export class UserSpace {
  private readonly userService = inject(UserSpaceService);

  roleEcoride: 'PASSAGER' | 'CHAUFFEUR' | 'BOTH' = 'PASSAGER';
  editionActive = signal(false);

  constructor() {
    this.userService.getInfos().subscribe({
      next: (data) => {
        this.roleEcoride = data.roleEcoride;

        if (data.voitures && Array.isArray(data.voitures)) {
          // @ts-ignore
          this.voitures.set(data.voitures)
/*          const voituresAdaptees = data.voitures.map(v => ({
            immatriculation: v.immatriculation,
            datePremiereImmatriculation: v.datePremiereImmatriculation,
            marque: v.marque,
            modele: v.modele,
            couleur: v.couleur,
            energie: v.energie,
            nbPlaces: v.nbPlaces
          }));*/
          //this.voitures.set(voituresAdaptees);
        }

        if (data.preferences) {
          this.preferences.fumeur = data.preferences.fumeur;
          this.preferences.animaux = data.preferences.animaux;
          // @ts-ignore
          this.preferences.autres = data.preferences.autres;
        }
      },
      error: () => {
        console.warn("Impossible de charger les infos de l’utilisateur");
      }
    });
  }

  voitures = signal([
    {
      immatriculation: '',
      datePremiereImmatriculation: '',
      marque: '',
      modele: '',
      couleur: '',
      energie: '',
      nbPlaces: 1
    }
  ]);

  preferences = {
    fumeur: false,
    animaux: false,
    autres: ''
  };

  ajouterVoiture() {
    this.voitures().push({
      immatriculation: '',
      datePremiereImmatriculation: '',
      marque: '',
      modele: '',
      couleur: '',
      energie: '',
      nbPlaces: 1
    });
  }

  removeVoiture(index: number, immatriculation: string) {
    console.log('call')
    const body =  {immatriculation: immatriculation};
    this.userService.supprimerVoiture(body).subscribe({
      next: (value: boolean) => {
        if (value){
          Swal.fire({icon: 'success', title: 'Profil mis à jour', timer: 2000, showConfirmButton: false})
            .then(r =>  this.voitures().splice(index, 1));
        }else {
          Swal.fire({ icon: 'error', title: 'Erreur', text: 'Échec lors de la suppression', confirmButtonColor: '#4caf50' })
        }
      },
      error: () => Swal.fire({ icon: 'error', title: 'Erreur', text: 'Échec lors de la suppression', confirmButtonColor: '#4caf50' })
    });
  }

  activerEdition() {
    this.editionActive.set(true);
  }
 async enregistrerInfos(form: NgForm) {
    if (!form.valid) return;

    const payload: UserSpaceForm = {
      roleEcoride: this.roleEcoride,
      // @ts-ignore
      voitures: this.roleEcoride === 'PASSAGER' ? [] : this.voitures().map(value => ({
        voitureId: null,
        immatriculation: value.immatriculation,
        datePremiereImmatriculation: value.datePremiereImmatriculation,
        marque: value.marque,
        modele: value.modele,
        couleur: value.couleur,
        energie: value.energie,
        nbPlaces: value.nbPlaces
      })),
      preferences: this.preferences
    };

    this.userService.enregistrerInfos(payload).subscribe({
      next: () => Swal.fire({ icon: 'success', title: 'Profil mis à jour', timer: 2000, showConfirmButton: false }),
      error: () => Swal.fire({ icon: 'error', title: 'Erreur', text: 'Échec lors de la sauvegarde', confirmButtonColor: '#4caf50' })
    });
  }
}
