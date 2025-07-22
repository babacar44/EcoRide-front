import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Covoiturage} from '../../core/models/covoiturage.model';
import {Observable} from 'rxjs';
import {Avis} from '../../core/models/avis.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CovoiturageService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = `${environment.apiUrl}/api/covoiturages`;
  private readonly BASE_URL_PARTICIPATION = `${environment.apiUrl}/api/participations`;
  private readonly BASE_URL_AVIS = `${environment.apiUrl}/api/avis`;

  // Signal interne pour stocker la liste
  private readonly _covoiturages = signal<Covoiturage[]>([]);

  // Signal public en lecture seule
  readonly covoiturages = this._covoiturages.asReadonly();

  rechercher(depart: string | undefined, arrivee: string | undefined, date: string | undefined): Observable<Covoiturage[]> {
    const params = { depart: depart ?? '', arrivee: arrivee ?? '', date: date ?? '' };

    return this.http.get<Covoiturage[]>(`${this.BASE_URL}/recherche`, { params, responseType: 'json' });
  }

  rechercherById(covoiturageId: number): Observable<Covoiturage> {
    const params = { covoiturageId: covoiturageId };
    return this.http.get<Covoiturage>(`${this.BASE_URL}/rechercherById`, { params, responseType: 'json' });
  }


  //
  setCovoiturages(data: Covoiturage[]) {
    this._covoiturages.set(data);
  }

  participerAuCovoiturage(covoiturageId: number): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/api/participations`, {
      covoiturageId
    });
  }

  getHistoriqueConducteur(): Observable<Covoiturage[]> {
    return this.http.get<Covoiturage[]>(`${this.BASE_URL}/mes-trajets`);
  }

  getHistoriquePassager(): Observable<Covoiturage[]> {
    return this.http.get<Covoiturage[]>(`${this.BASE_URL}/mes-trajets-passager`);
  }

  annulerCovoiturage(trajet: Covoiturage) {
    console.log(trajet)
    return this.http.put(`${this.BASE_URL}/annuler`, trajet);
  }

  annulerParticipation(id: number) {
    return this.http.delete(`${this.BASE_URL_PARTICIPATION}`, {body : {'covoiturageId': id}});
  }

  demarrer(trajet: Covoiturage): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/demarrer`, trajet);
  }

  terminer(trajet: Covoiturage): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/terminer`, trajet);
  }

  envoyerAvis(avis: Avis): Observable<void> {
    return this.http.post<void>(`${this.BASE_URL_AVIS}`, avis);
  }
}
