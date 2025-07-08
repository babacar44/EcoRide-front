import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Covoiturage} from '../../core/models/covoiturage.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovoiturageService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:8083/api/covoiturages';

  // Signal interne pour stocker la liste
  private readonly _covoiturages = signal<Covoiturage[]>([]);

  // Signal public en lecture seule
  readonly covoiturages = this._covoiturages.asReadonly();

  rechercher(depart: string | undefined, arrivee: string | undefined, date: string | undefined): Observable<Covoiturage[]> {
    const params = { depart: depart ?? '', arrivee: arrivee ?? '', date: date ?? '' };

    return this.http.get<Covoiturage[]>(`${this.BASE_URL}/recherche`, { params, responseType: 'json' });
  }

  //
  setCovoiturages(data: Covoiturage[]) {
    this._covoiturages.set(data);
  }

  participerAuCovoiturage(covoiturageId: number): Observable<void> {
    return this.http.post<void>('http://localhost:8083/api/participations', {
      covoiturageId
    });
  }

}
