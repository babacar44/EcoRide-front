import { Component } from '@angular/core';
import {Carousel} from './components/carousel/carousel';
import {SearchBar} from './components/search-bar/search-bar';
import {AboutEcoride} from './components/about-ecoride/about-ecoride';

@Component({
  selector: 'app-home',
  imports: [Carousel, SearchBar, AboutEcoride],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {


}
