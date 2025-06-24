export interface Utilisateur {
  utilisateurId: number;
  nom: string;
  prenom: string;
  email: string;
  pseudo: string;
  photo?: string;
  suspendu?: boolean;
  credit?: number;
}
