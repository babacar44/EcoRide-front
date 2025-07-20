import { Routes } from '@angular/router';
import {Home} from './features/home/home';
import {Layout} from './core/layout/layout/layout';
import {LegalNotice} from './features/home/components/pages/legal-notice/legal-notice';
import {Covoiturages} from './features/covoiturages/covoiturages';
import {CovoiturageDetail} from './features/covoiturages/covoiturage-detail/covoiturage-detail';
import {Connexion} from './features/auth/connexion/connexion';
import {Inscription} from './features/auth/inscription/inscription';
import {UserSpace} from './features/user-space/user-space';
import {EmployeSpace} from './features/employe-space/employe-space';
import {employeGuard} from './core/guards/employe.guard';
import {adminGuard} from './core/guards/admin.guard';
import {userGuard} from './core/guards/user.guard';

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
      {
        path: 'espace-utilisateur',
        canActivate: [userGuard],
        loadComponent: () => import('./features/user-space/user-space').then(m => m.UserSpace)
      },
      {
        path: 'employe',
        canActivate: [employeGuard],
        loadComponent: () => import('./features/employe-space/employe-space').then(m => m.EmployeSpace)
      },
      {
        path: 'admin',
        canActivate: [adminGuard],
        loadComponent: () => import('./features/admin-space/admin-space').then(m => m.AdminSpace)
      }
    ]
  }
];
