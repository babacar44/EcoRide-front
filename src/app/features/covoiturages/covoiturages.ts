import {Component, computed, effect, inject, signal} from '@angular/core';
import {SearchBar} from '../home/components/search-bar/search-bar';
import {CovoituragesList} from './covoiturages-list/covoiturages-list';
import {CommonModule} from '@angular/common';
import {Covoiturage, PreferencesConducteur} from '../../core/models/covoiturage.model';
import {CovoiturageService} from './covoiturage.service';
import {ActivatedRoute} from '@angular/router';
import {Utilisateur} from "../../core/models/utilisateur.model";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-covoiturages',
  imports: [SearchBar, CovoituragesList, CommonModule, FormsModule],
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
  readonly filters = signal({
    eco: false,
    maxPrice: null as number | null,
    maxDuration: null as number | null,
    minRating: null as number | null
  });
  formFilters = { ...this.filters() };

  constructor() {
    // inject ActivatedRoute
    const route = inject(ActivatedRoute);

    // Charger les paramètres de l'URL au démarrage
    route.queryParams.subscribe(params => {
      const depart = params['depart'];
      const arrivee = params['arrivee'];
      const date = params['date'];

      if (depart && arrivee && date) {
        this.onSearchTriggered({ depart, arrivee, date });
      }
    });

    effect(() => {
      const criteria = this.searchCriteria;
      if (criteria()){
        this.loading.set(true);
        this.covoiturageService
          .rechercher(criteria()?.depart, criteria()?.arrivee, criteria()?.date)
            .subscribe(data => {
              const enriched = data.map(c => {
                const start = new Date(`2000-01-01T${c.heureDepart}`);
                const end = new Date(`2000-01-01T${c.heureArrivee}`);

                // Gestion traversée minuit
                if (end < start) end.setHours(end.getHours() + 24);

                const dureeMin = (end.getTime() - start.getTime()) / 60000;

                return {
                  ...c,
                  duree: dureeMin,
                  conducteur: {
                    ...(c.conducteur as Utilisateur),
                    note: Math.floor(Math.random() * 2) + 4
                  }
                };
              });
              this.covoiturageService.setCovoiturages(enriched);
            });
      }
    });
  }

  onSearchTriggered(criteria: { depart: string; arrivee: string; date: string }) {
    this.searchCriteria.set(criteria);
  }

  readonly filteredCovoiturages = computed(() => {
    const list = this.covoiturageService.covoiturages();
    const { eco, maxPrice, maxDuration, minRating } = this.filters();

    return list.filter((covoit) => {
      const isEco = !eco || covoit.voiture?.energie === 'ELECTRIQUE';
      const isPriceOk = !maxPrice || covoit.prixPersonne <= maxPrice;
      const isDurationOk = !maxDuration || (covoit.duree ?? Infinity) <= maxDuration;
      const isNoteOk = !minRating || (covoit.conducteur?.note ?? 0) >= minRating;

      return isEco && isPriceOk && isDurationOk && isNoteOk;
    });
  });

  applyFilters() {
    this.filters.set({ ...this.formFilters });
  }
}
