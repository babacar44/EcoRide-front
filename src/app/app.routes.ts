import { Routes } from '@angular/router';
import {Home} from './features/home/home/home';
import {Layout} from './core/layout/layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Home },
    ]
  }
];
