import {Component, HostListener} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})
export class SearchBar {
  departure = '';
  destination = '';
  travelDate = '';
  passengers = 1;
  isMobile: boolean = false;


  search() {
    console.log('Recherche :', this.departure, this.destination, this.travelDate, this.passengers);
    // TODO : rediriger vers /rides ou appeler un service
  }

  constructor() {
    this.checkScreenWidth();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenWidth();
  }

  private checkScreenWidth() {
    this.isMobile = window.innerWidth <= 820;
  }
}
