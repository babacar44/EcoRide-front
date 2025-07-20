import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Signalement} from '../../../core/models/signalement.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  private readonly api = 'http://localhost:8083/api/employe/signalements';

  constructor(private http: HttpClient) {}

  getSignalements(): Observable<Signalement[]> {
    return this.http.get<Signalement[]>(`${this.api}`);
  }

  validerTrajet(covoiturageId: number, participationId: number): Observable<void> {
    const body : Signalement = {
      covoiturageId: covoiturageId, participationId: participationId,
      conducteur: {
        nom: '',
        prenom: '',
        email: '',
        pseudo: '',
        telephone: '',
        credit: 0
      },
      passager: {
        nom: '',
        prenom: '',
        email: '',
        pseudo: '',
        telephone: '',
        credit: 0
      },
      lieuDepart: '',
      lieuArrivee: '',
      dateDepart: '',
      commentaire: '',
      numero: '',
      note: 0
    }
    return this.http.post<void>(`${this.api}/valider`, body);
  }

}
