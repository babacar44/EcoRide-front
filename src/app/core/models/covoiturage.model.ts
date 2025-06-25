import {Utilisateur} from './utilisateur.model';
import {Voiture} from './voiture.model';

export interface Covoiturage {
  covoiturageId: number;
  dateDepart: string;
  heureDepart: string;
  dateArrivee: string;
  heureArrivee: string;
  lieuDepart: string;
  lieuArrivee: string;
  statut: string;
  nbPlace: number;
  prixPersonne: number;
  conducteur?: Utilisateur;
  voiture?: Voiture;
  duree?: number; // durée calculée en minutes

}


