import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Landing } from './pages/landing/landing';
import { Profile } from './pages/profile/profile';
import { Recover } from './pages/recover/recover';
import { AuthGuard } from './guards/auth.guard-guard';
import { AccommodationDetail } from './pages/accommodation-detail/accommodation-detail';
import { AccommodationMetrics } from './pages/accommodation-metrics/accommodation-metrics';
import { CreateAccommodationComponent } from './pages/create-accommodation/create-accommodation';
import { Map } from './components/map/map';

export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'profile', component: Profile },
  { path: 'register', component: Register },
  { path: 'landing', component: Landing },
  { path: 'accommodation/:id', component: AccommodationDetail },
  { path: 'accommodation-metrics/:id', component: AccommodationMetrics },
  {
    path: 'create-accommodation',
    component: CreateAccommodationComponent,
    canActivate: [AuthGuard],
  },
  { path: 'recover', component: Recover },
  { path: 'logout', redirectTo: 'login' },
  { path: 'home', redirectTo: 'landing' },
  { path: 'map', component: Map },
  { path: '**', redirectTo: 'landing' },
];
