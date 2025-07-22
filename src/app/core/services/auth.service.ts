import { Injectable, computed, signal } from '@angular/core';
import {RegisterRequest} from '../models/auth.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Utilisateur} from '../models/utilisateur.model';
import {environment} from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  private readonly _token = signal<string | null>(localStorage.getItem('token'));

  // signal public pour savoir si l'utilisateur est connecté
  readonly isAuthenticated = computed(() => this._token() !== null);

  // signal qui décode le payload du token (si présent)
  readonly payload = computed(() => {
    const token = this._token();
    if (!token) return null;
    try {
      const base64 = token.split('.')[1];
      return JSON.parse(atob(base64));
    } catch {
      return null;
    }
  });

  readonly userId = computed(() => this.payload()?.utilisateurId ?? null);
  readonly userRole = computed(() => this.payload()?.role ?? null);
  readonly userPseudo = computed(() => this.payload()?.pseudo ?? null);

  /** Connexion réussie → stocke le token */
  login(token: string) {
    localStorage.setItem('token', token);
    this._token.set(token);
  }

  /** Déconnexion → supprime le token */
  logout() {
    localStorage.removeItem('token');
    this._token.set(null);
  }

  /** Utilisé pour l'en-tête Authorization si besoin */
  getAuthorizationHeader(): string | null {
    const token = this._token();
    return token ? `Bearer ${token}` : null;
  }

  register(data: RegisterRequest) {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/auth/register`, data);
  }

  getUserInfo(){
    return this.http.get<Utilisateur>(`${environment.apiUrl}/api/utilisateurs/utilisateur/infos`)
  }
}
