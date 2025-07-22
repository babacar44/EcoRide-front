import {Component, HostListener, inject, output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from '@angular/router';

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

  readonly route = inject(ActivatedRoute);
  searchTriggered = output<{
    depart: string;
    arrivee: string;
    date: string;
  }>();

  search() {
    console.log('Recherche :', this.departure, this.destination, this.travelDate, this.passengers);

    if (this.departure && this.destination && this.travelDate) {
      this.searchTriggered.emit({
        depart: this.departure.trim(),
        arrivee: this.destination.trim(),
        date: this.travelDate
      })
    }
  }

  constructor() {
    this.checkScreenWidth();
    const query = this.route.snapshot.queryParamMap;
    this.departure = query.get('depart') ?? '';
    this.destination = query.get('arrivee') ?? '';
    this.travelDate = query.get('date') ?? '';

  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenWidth();
  }

  private checkScreenWidth() {
    this.isMobile = window.innerWidth <= 820;
  }
}
