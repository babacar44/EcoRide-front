import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  private fb = inject(FormBuilder)
  private router = inject(Router)

  contactForm = this.fb.group({
    nom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });

  onSubmit() {
    if (this.contactForm.valid) {
      Swal.fire({
        icon: 'success',
        title: 'Message envoyé',
        text: 'Merci pour votre message, nous vous répondrons rapidement.',
        confirmButtonColor: '#28a745',
        timer: 2500
      }).then(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
