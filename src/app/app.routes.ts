import { Routes } from '@angular/router';
import {Home} from './features/home/home';
import {Layout} from './core/layout/layout/layout';
import {LegalNotice} from './features/home/components/pages/legal-notice/legal-notice';
import {Covoiturages} from './features/covoiturages/covoiturages';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'mentions-legales', component: LegalNotice },
      { path: 'covoiturages', component: Covoiturages },
    ]
  }
];
