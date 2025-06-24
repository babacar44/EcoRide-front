import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Covoiturage} from '../../core/models/covoiturage.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovoiturageService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:8083/api/covoiturages';

  rechercher(depart: string | undefined, arrivee: string | undefined, date: string | undefined): Observable<Covoiturage[]> {
    const params = { depart: depart ?? '', arrivee: arrivee ?? '', date: date ?? '' };
    return this.http.get<Covoiturage[]>(`${this.BASE_URL}/recherche`, { params, responseType: 'json' });
  }
}
