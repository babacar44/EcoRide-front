// core/models/signalement.model.ts
export interface Signalement {
  covoiturageId: number;
  participationId: number;
  conducteur: {
    nom: string;
    prenom: string;
    email: string;
    pseudo: string;
    telephone: string;
    credit: number;
  };
  passager: {
    nom: string;
    prenom: string;
    email: string;
    pseudo: string;
    telephone: string;
    credit: number;
  };
  lieuDepart: string;
  lieuArrivee: string;
  dateDepart: string;
  commentaire: string;
  numero: string;
  note: number;
}
