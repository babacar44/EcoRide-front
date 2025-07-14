import {Voiture} from './voiture.model';

export interface UserSpaceForm {
  roleEcoride: 'PASSAGER' | 'CHAUFFEUR' | 'BOTH';
  role?: string;
  voitures?: Voiture[],
  preferences?: {
    fumeur: boolean;
    animaux: boolean;
    autres?: string;
  };
}
