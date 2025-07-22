import { Injectable } from '@angular/core';
import {UserSpaceForm} from '../../../core/models/user-space-form.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserSpaceService {

  private readonly apiUrl = `${environment.apiUrl}/api/espace-utilisateur`;

  constructor(private http: HttpClient) {}


  getInfos(): Observable<UserSpaceForm> {
    return this.http.get<UserSpaceForm>(this.apiUrl);
  }


  enregistrerInfos(data: UserSpaceForm): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  supprimerVoiture(body: { immatriculation: string }): Observable<any> {
    return this.http.delete(this.apiUrl, {body : body});
  }

  saisirVoyage(data: {depart: string; arrivee: string; date: string; heureDepart: string; heureArrivee: string; prix: number; voitureId: null}) {

  }
}
