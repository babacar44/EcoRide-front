import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoyageService {
  private readonly apiUrl = 'http://localhost:8083/api/covoiturages/creer'; // adapte le chemin

  constructor(private http: HttpClient) {}

  saisirVoyage(data: {
    lieuDepart: string;
    lieuArrivee: string;
    dateDepart: string;
    dateArrivee: string;
    heureDepart: string;
    heureArrivee: string;
    prixPersonne: number;
    immatriculation: string
  }): Observable<any> {
    const body = {
      ...data,
      voiture : {immatriculation: data.immatriculation}
    }
    return this.http.post(this.apiUrl, body);
  }
}
