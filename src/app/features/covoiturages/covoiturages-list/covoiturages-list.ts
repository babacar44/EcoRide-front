import {Component, input} from '@angular/core';
import {Covoiturage} from '../../../core/models/covoiturage.model';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-covoiturages-list',
    imports: [
        RouterLink
    ],
  templateUrl: './covoiturages-list.html',
  styleUrl: './covoiturages-list.scss'
})
export class CovoituragesList {

  covoiturages = input.required<Covoiturage[]>();
}
