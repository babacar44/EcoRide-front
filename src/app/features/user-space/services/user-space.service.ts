import { Injectable } from '@angular/core';
import {UserSpaceForm} from '../../../core/models/user-space-form.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSpaceService {

  private readonly apiUrl = 'http://localhost:8083/api/espace-utilisateur'; // adapte le chemin

  constructor(private http: HttpClient) {}

  envoyerInfos(form: UserSpaceForm): Observable<void> {
    return this.http.post<void>(this.apiUrl, form);
  }

  getInfos(): Observable<UserSpaceForm> {
    return this.http.get<UserSpaceForm>(this.apiUrl);
  }


  enregistrerInfos(data: UserSpaceForm): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  supprimerVoiture(body: { immatriculation: string }): Observable<any> {
    return this.http.delete(this.apiUrl, {body : body});
  }
}
