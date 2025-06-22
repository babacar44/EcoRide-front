import {Component, OnInit} from '@angular/core';
import {
  CarouselCaptionComponent,
  CarouselComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent
}from '@coreui/angular';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-carousel',
  imports: [
    CarouselComponent,
    CarouselIndicatorsComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselCaptionComponent,
    CarouselControlComponent,
  ],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss'
})
export class Carousel {

  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });

  constructor() {
    this.slides[0] = {
      id: 0,
      src: 'assets/slides/slide3.jpg',
      title: 'Réduisez votre empreinte carbone',
      subtitle: 'Voyagez de maniére écologique avec EcoRide.'
    };
    this.slides[1] = {
      id: 1,
      src: 'assets/slides/slide3.jpg',
      title: 'Economiser sur vos trajets',
      subtitle: 'Des prix avantageux pour tous les trajets.',
    };
    this.slides[2] = {
      id: 2,
      src: 'assets/slides/slide3.jpg',
      title: 'Confort et Sécurité',
      subtitle: 'Avec des conducteurs vérifiés et recommandés.',
    };
  }
}
