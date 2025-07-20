import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.scss'
})
export class Connexion {
  email = '';
  password = '';

private auth = inject(AuthService);
  private router = inject(Router);
  private http = inject(HttpClient);

  async login() {
    if (!this.email || !this.password) {
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez entrer vos identifiants',
        confirmButtonColor: '#4caf50'
      });
      return;
    }

    const credentials = { email: this.email, password: this.password };

    this.http.post<{ token: string }>('http://localhost:8083/auth/login', credentials)
      .subscribe({
        next: (response) => {
          this.auth.login(response.token);

          const pending = localStorage.getItem('pendingCovoiturage');
          if (pending) {
            const covoit = JSON.parse(pending);
            localStorage.removeItem('pendingCovoiturage');
            this.router.navigate(['/covoiturages', covoit.covoiturageId]);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: async (err) => {
          await Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Échec de la connexion. Vérifiez vos identifiants.',
            confirmButtonColor: '#4caf50'
          });
        }
      });
  }

  inscrire() {
    this.router.navigate(['/inscription']);
  }
}
