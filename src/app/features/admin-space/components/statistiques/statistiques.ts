import { Component } from '@angular/core';
import {StatsCovoiturages} from './stats-covoiturages/stats-covoiturages';
import {StatsCredits} from './stats-credits/stats-credits';

@Component({
  selector: 'app-statistiques',
  imports: [
    StatsCovoiturages,
    StatsCredits
  ],
  templateUrl: './statistiques.html',
  styleUrl: './statistiques.scss'
})
export class Statistiques {

}
