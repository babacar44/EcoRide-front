import {Component, input} from '@angular/core';
import {Covoiturage} from '../../../core/models/covoiturage.model';

@Component({
  selector: 'app-covoiturages-list',
  imports: [],
  templateUrl: './covoiturages-list.html',
  styleUrl: './covoiturages-list.scss'
})
export class CovoituragesList {

  covoiturages = input.required<Covoiturage[]>();
}
