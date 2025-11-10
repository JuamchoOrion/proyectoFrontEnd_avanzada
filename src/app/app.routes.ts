import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Landing } from './pages/landing/landing';
import { Profile } from './pages/profile/profile';
import { Recover } from './pages/recover/recover';
import { AuthGuard } from './guards/auth.guard-guard';
import { AccommodationDetail } from './pages/accommodation-detail/accommodation-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'profile', component: Profile },
  { path: 'register', component: Register },
  { path: 'landing', component: Landing, canActivate: [AuthGuard] },
  { path: 'accommodation/:id', component: AccommodationDetail },
  { path: 'recover', component: Recover },
  { path: '**', redirectTo: 'login' },
];
