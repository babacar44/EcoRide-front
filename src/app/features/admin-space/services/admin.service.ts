import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Utilisateur} from '../../../core/models/utilisateur.model';
import {RegisterRequest} from '../../../core/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly API = 'http://localhost:8083/api';

  constructor(private http: HttpClient) {}

  getAllUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.API}/utilisateurs`);
  }

  toggleSuspension(utilisateurId: number): Observable<void> {
    return this.http.put<void>(`${this.API}/admin/utilisateurs/${utilisateurId}/suspension`, {});
  }

  creerEmploye(data: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.API}/utilisateurs/creer-employes`, data);
  }

  getStatsCovoituragesParJour() {
    return this.http.get<{ date: string, total: number }[]>(`${this.API}/admin/stats/covoiturages-par-jour`);
  }

  getStatsCreditsParJour() {
    return this.http.get<{ date: string, credits: number }[]>(`${this.API}/admin/stats/credits-par-jour`);
  }
}
