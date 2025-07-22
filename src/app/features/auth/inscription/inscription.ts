import {Component, inject} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription',
  imports: [CommonModule, FormsModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.scss'
})
export class Inscription {

  private auth = inject(AuthService);
  private router = inject(Router);

  nom = '';
  prenom = '';
  email = '';
  password = '';
  pseudo = '';
  telephone = '';
  adresse = '';
  dateNaissance = '';


  register() {
    const payload = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password,
      pseudo: this.pseudo,
      telephone: this.telephone,
      adresse: this.adresse,
      dateNaissance: this.dateNaissance,
    };

    this.auth.register(payload).subscribe({
      next: (res) => {
        this.auth.login(res.token);
        const redirect = localStorage.getItem('redirectAfterLogin');
        if (redirect) {
          localStorage.removeItem('redirectAfterLogin');
          this.router.navigate([redirect]);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: async () => {
        await Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur lors de l\'inscription',
          confirmButtonColor: '#4caf50'
        });
      },
    });
  }
}
