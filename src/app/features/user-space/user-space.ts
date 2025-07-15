import {Component, inject, signal} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserSpaceService } from './services/user-space.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {VoitureFormulaire} from './components/voiture-formulaire/voiture-formulaire';
import {VoyageForm} from './components/voyage-form/voyage-form';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-space',
  standalone: true,
  imports: [CommonModule, FormsModule, VoitureFormulaire, VoyageForm],
  templateUrl: './user-space.html',
  styleUrl: './user-space.scss'
})
export class UserSpace {
  private readonly userService = inject(UserSpaceService);
  roleEcoride = signal<'PASSAGER' | 'CHAUFFEUR' | 'BOTH'>( 'PASSAGER');
  preferences = {
    fumeur: false,
    animaux: false,
    autres: ''
  };

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

  constructor() {
    this.userService.getInfos().subscribe({
      next: (data) => {
        this.roleEcoride.set(data.roleEcoride);

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

  onRoleEcorideChange(newRole: "PASSAGER" | "CHAUFFEUR" | "BOTH") {
    this.roleEcoride.set(newRole)
  }
}
