import {Component, OnInit} from '@angular/core';
import {AvisValidation} from './components/avis-validation/avis-validation';
import {Signalements} from './components/signalements/signalements';
import {Signalement} from '../../core/models/signalement.model';
import {EmployeService} from './services/employe-service';

@Component({
  selector: 'app-employe-space',
  imports: [AvisValidation, Signalements],
  templateUrl: './employe-space.html',
  styleUrl: './employe-space.scss'
})
export class EmployeSpace {

  // @ts-ignore
  activeTab: 'signalements' | 'validation' = 'utilisateurs';

  switchTab(tab: 'signalements' | 'validation') {
    this.activeTab = tab;
  }
}
