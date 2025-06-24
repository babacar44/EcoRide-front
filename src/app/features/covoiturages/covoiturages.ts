import {Component, effect, inject, signal} from '@angular/core';
import {SearchBar} from '../home/components/search-bar/search-bar';
import {CovoituragesList} from './covoiturages-list/covoiturages-list';
import {CommonModule} from '@angular/common';
import {Covoiturage} from '../../core/models/covoiturage.model';
import {CovoiturageService} from './covoiturage.service';

@Component({
  selector: 'app-covoiturages',
  imports: [SearchBar, CovoituragesList, CommonModule],
  templateUrl: './covoiturages.html',
  styleUrl: './covoiturages.scss'
})
export class Covoiturages {

  private covoiturageService = inject(CovoiturageService);
  // Signal qui contient les critères de recherche
  readonly searchCriteria =  signal<{ depart: string; arrivee: string; date: string } | null>(null);

  // Signal qui contiendra les résultats
  readonly covoiturages = signal<Covoiturage[]>([]);
  readonly loading = signal(false);

  constructor() {
    effect(() => {
      const criteria = this.searchCriteria;
      if (criteria()){
        this.loading.set(true);
        this.covoiturageService
          .rechercher(criteria()?.depart, criteria()?.arrivee, criteria()?.date)
          .subscribe({
            next: (data) => this.covoiturages.set(data),
            error: () => this.covoiturages.set([]),
            complete: () => this.loading.set(false)
          });
      }
    });
  }

  onSearchTriggered(criteria: { depart: string; arrivee: string; date: string }) {
    this.searchCriteria.set(criteria);
  }
}
