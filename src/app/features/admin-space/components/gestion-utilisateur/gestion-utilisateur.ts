import {Component, inject, signal} from '@angular/core';
import {Utilisateur} from '../../../../core/models/utilisateur.model';
import {AdminService} from '../../services/admin.service';
import Swal from 'sweetalert2';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-gestion-utilisateur',
  imports: [
    NgClass
  ],
  templateUrl: './gestion-utilisateur.html',
  styleUrl: './gestion-utilisateur.scss'
})
export class GestionUtilisateur {
  private readonly adminService = inject(AdminService);
  readonly utilisateurs = signal<Utilisateur[]>([]);
  readonly loading = signal(false);

  constructor() {
    this.chargerUtilisateurs();
  }

  chargerUtilisateurs() {
    this.loading.set(true);
    this.adminService.getAllUtilisateurs().subscribe({
      next: (data) => this.utilisateurs.set(data),
      error: () => Swal.fire('Erreur', 'Impossible de charger les utilisateurs', 'error'),
      complete: () => this.loading.set(false)
    });
  }

  toggleSuspension(utilisateur: Utilisateur) {
    const action = utilisateur.suspendu ? 'réactiver' : 'suspendre';
    Swal.fire({
      title: `Confirmer`,
      text: `Voulez-vous ${action} ${utilisateur.prenom} ${utilisateur.nom} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4caf50',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        this.adminService.toggleSuspension(utilisateur.utilisateurId!).subscribe(() => {
          this.chargerUtilisateurs();
        });
      }
    });
  }

  async creerEmploye() {
    const { value: formData } = await Swal.fire({
      title: 'Créer un employé',
      html: `
      <input id="nom" class="swal2-input" placeholder="Nom">
      <input id="prenom" class="swal2-input" placeholder="Prénom">
      <input id="email" class="swal2-input" placeholder="Email" type="email">
      <input id="password" class="swal2-input" placeholder="Mot de passe" type="password">
      <input id="telephone" class="swal2-input" placeholder="Téléphone">
      <input id="adresse" class="swal2-input" placeholder="Adresse">
      <input id="pseudo" class="swal2-input" placeholder="Pseudo">
      <input id="dateNaissance" class="swal2-input" type="date">
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Créer',
      confirmButtonColor: '#4caf50',
      preConfirm: () => {
        const champs = ['nom', 'prenom', 'email', 'password', 'telephone', 'adresse', 'pseudo', 'dateNaissance'];
        const data: Record<string, string> = {};

        for (const id of champs) {
          const value = (document.getElementById(id) as HTMLInputElement)?.value.trim();
          if (!value) {
            Swal.showValidationMessage(`Le champ "${id}" est requis.`);
            return;
          }
          data[id] = value;
        }

        return data;
      }
    });

    if (formData) {
      this.adminService.creerEmploye(formData).subscribe({
        next: () => {
          Swal.fire('Succès', 'Employé créé !', 'success');
          this.chargerUtilisateurs();
        },
        error: () => Swal.fire('Erreur', 'Impossible de créer cet employé', 'error')
      });
    }
  }

}
