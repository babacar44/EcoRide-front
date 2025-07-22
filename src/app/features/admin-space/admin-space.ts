import { Component } from '@angular/core';
import {Statistiques} from './components/statistiques/statistiques';
import {GestionUtilisateur} from './components/gestion-utilisateur/gestion-utilisateur';

@Component({
  selector: 'app-admin-space',
  imports: [
    Statistiques,
    GestionUtilisateur
  ],
  templateUrl: './admin-space.html',
  styleUrl: './admin-space.scss'
})
export class AdminSpace {
  activeTab: 'utilisateurs' | 'stats' = 'utilisateurs';

  switchTab(tab: 'utilisateurs' | 'stats') {
    this.activeTab = tab;
  }
}
