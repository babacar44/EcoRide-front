import { Routes } from '@angular/router';
import {Home} from './features/home/home';
import {Layout} from './core/layout/layout/layout';
import {LegalNotice} from './features/home/components/pages/legal-notice/legal-notice';
import {Covoiturages} from './features/covoiturages/covoiturages';
import {CovoiturageDetail} from './features/covoiturages/covoiturage-detail/covoiturage-detail';
import {Connexion} from './features/auth/connexion/connexion';
import {Inscription} from './features/auth/inscription/inscription';
import {UserSpace} from './features/user-space/user-space';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'mentions-legales', component: LegalNotice },
      { path: 'covoiturages', component: Covoiturages },
      { path: 'covoiturages/:id', component: CovoiturageDetail },
      { path: 'connexion', component: Connexion },
      { path: 'inscription', component: Inscription },
      { path: 'espace-utilisateur', component: UserSpace },

    ]
  }
];
