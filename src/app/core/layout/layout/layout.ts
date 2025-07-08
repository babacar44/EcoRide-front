import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  menuOpen: boolean = false;
  private auth = inject(AuthService);
  readonly isAuthenticated = this.auth.isAuthenticated;
  private router = inject(Router);
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? 'hidden' : '';
  }

  closeMenu() {
    this.menuOpen = false;
    document.body.style.overflow =''
  }

  logout() {
    this.auth.logout();
  }

  handleLogout() {
    this.logout();
    this.closeMenu();
    this.router.navigate(['/']);
  }

}
