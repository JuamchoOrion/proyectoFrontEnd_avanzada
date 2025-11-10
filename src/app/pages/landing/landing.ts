import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { SearchFilter } from '../../components/search-filter/search-filter';
import { CarouselComponent } from '../../components/carousel/carousel';
import { DestinationsSection } from '../../components/destination-section/destination-section';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [Navbar, SearchFilter, CarouselComponent, DestinationsSection, Footer],
  templateUrl: './landing.html',
  styleUrls: ['./landing.css'],
})
export class Landing {}
