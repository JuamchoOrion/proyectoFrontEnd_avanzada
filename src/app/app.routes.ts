import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Landing } from './pages/landing/landing';
import { Profile } from './pages/profile/profile';
import { Recover } from './pages/recover/recover';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'profile', component: Profile },
  { path: 'register', component: Register },
  { path: 'landing', component: Landing },
  { path: 'recover', component: Recover },
  { path: '**', redirectTo: 'login' },
];
