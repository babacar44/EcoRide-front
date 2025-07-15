import {
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  InputSignal,
  Output,
  signal,
  WritableSignal
} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {UserSpaceService} from '../../services/user-space.service';
import Swal from 'sweetalert2';
import {UserSpaceForm} from '../../../../core/models/user-space-form.model';
import {CommonModule} from '@angular/common';
import {Voiture} from '../../../../core/models/voiture.model';

@Component({
  selector: 'app-voiture-formulaire',
    imports: [
        CommonModule, FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './voiture-formulaire.html',
  styleUrl: './voiture-formulaire.scss'
})
export class VoitureFormulaire {

  private readonly userService = inject(UserSpaceService);

  editionActive = signal(false);
  voitures = input<Voiture[]>();
  preferences = input.required<{ fumeur: boolean; animaux: boolean; autres: string }>();
  @Input({required: true}) roleEcoride!: WritableSignal<"PASSAGER" | "CHAUFFEUR" | "BOTH">;
  @Output() roleEcorideChange = new EventEmitter<"PASSAGER" | "CHAUFFEUR" | "BOTH">();
  constructor() {

  }

  onRoleChange(value: "PASSAGER" | "CHAUFFEUR" | "BOTH"){
    this.roleEcorideChange.emit(value);
  }

  ajouterVoiture() {
    this.voitures()?.push({
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
            .then(r =>  this.voitures()?.splice(index, 1));
        }else {
          Swal.fire({ icon: 'error', title: 'Erreur', text: 'Échec lors de la suppression', confirmButtonColor: '#4caf50' })
        }
      },
      error: () => Swal.fire({ icon: 'error', title: 'Erreur', text: 'Échec lors de la suppression', confirmButtonColor: '#4caf50' })
    });
  }

  activerEdition() {
    this.editionActive.set(!this.editionActive());
  }
  async enregistrerInfos(form: NgForm) {
    if (!form.valid) return;

    const payload: UserSpaceForm = {
      roleEcoride: this.roleEcoride(),
      // @ts-ignore
      voitures: this._roleEcoride === 'PASSAGER' ? [] : this.voitures().map(value => ({
        voitureId: null,
        immatriculation: value.immatriculation,
        datePremiereImmatriculation: value.datePremiereImmatriculation,
        marque: value.marque,
        modele: value.modele,
        couleur: value.couleur,
        energie: value.energie,
        nbPlaces: value.nbPlaces
      })),
      preferences: this.preferences()
    };

    this.userService.enregistrerInfos(payload).subscribe({
      next: () => Swal.fire({ icon: 'success', title: 'Profil mis à jour', timer: 2000, showConfirmButton: false }),
      error: () => Swal.fire({ icon: 'error', title: 'Erreur', text: 'Échec lors de la sauvegarde', confirmButtonColor: '#4caf50' })
    });
  }
}
