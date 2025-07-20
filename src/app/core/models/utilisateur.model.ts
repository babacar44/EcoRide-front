export interface Utilisateur {
  utilisateurId: number;
  nom: string;
  role: string;
  prenom: string;
  email: string;
  pseudo: string;
  photo?: string;
  suspendu?: boolean;
  credit: number;
  note?: number;
}
