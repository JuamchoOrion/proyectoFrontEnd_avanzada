import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Landing } from './pages/landing/landing';
import { Profile } from './pages/profile/profile';
import { Recover } from './pages/recover/recover';
import { AuthGuard } from './guards/auth.guard-guard';
import { AccommodationDetail } from './pages/accommodation-detail/accommodation-detail';
import { CreateAccommodationComponent } from './pages/create-accommodation/create-accommodation';
import { Map } from './components/map/map';
import { RoleGuard } from './guards/role.guard-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'profile', component: Profile, canActivate: [AuthGuard] },
  { path: 'register', component: Register },
  { path: 'landing', component: Landing },
  { path: 'accommodation/:id', component: AccommodationDetail, canActivate: [AuthGuard] },
  {
    path: 'create-accommodation',
    component: CreateAccommodationComponent,
    canActivate: [RoleGuard],
  },
  { path: 'recover', component: Recover },
  { path: 'logout', redirectTo: 'login' },
  { path: 'home', redirectTo: 'landing' },
  { path: 'map', component: Map },
  { path: '**', redirectTo: 'landing' },
];
