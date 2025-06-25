import {Component, inject} from '@angular/core';
import {Carousel} from './components/carousel/carousel';
import {SearchBar} from './components/search-bar/search-bar';
import {AboutEcoride} from './components/about-ecoride/about-ecoride';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Carousel, SearchBar, AboutEcoride],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private router =  inject(Router);

  onSearchTriggered(data: { depart: string; arrivee: string; date: string }) {
    this.router.navigate(['/covoiturages'], {
      queryParams: {
        depart: data.depart,
        arrivee: data.arrivee,
        date: data.date
      }
    });
  }
}
