import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Landing } from './pages/landing/landing';
import { Profile } from './pages/profile/profile';
import { ProfileHost } from './pages/profile-host/profile-host';
import { Recover } from './pages/recover/recover';
import { AuthGuard } from './guards/auth.guard-guard';
import { AccommodationDetail } from './pages/accommodation-detail/accommodation-detail';
import { AccommodationMetrics } from './pages/accommodation-metrics/accommodation-metrics';
import { CreateAccommodationComponent } from './pages/create-accommodation/create-accommodation';
import { Map } from './components/map/map';
import { RoleGuard } from './guards/role.guard-guard';
import { HomeMap } from './components/home-map/home-map';
import { CreateReservationComponent } from './pages/create-reservation/create-reservation';
import { EditProfilePage } from './pages/edit-profile/edit-profile';
import { Chat } from './pages/chat/chat';
import { ReservationDetail } from './pages/review-detail/review-detail';
import { EditAccommodationFormComponent } from './components/edit-accommodation-form/edit-accommodation-form';


export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'recover', component: Recover },

  { path: 'profile', component: Profile, canActivate: [AuthGuard] },

  {
    path: 'profile-host',
    component: ProfileHost,
    canActivate: [AuthGuard, RoleGuard],
  },

  { path: 'edit-profile', component: EditProfilePage, canActivate: [AuthGuard] },

  { path: 'landing', component: Landing },
  { path: 'accommodation-metrics/:id', component: AccommodationMetrics },
  {
    path: 'accommodation/:id/reserve',
    component: CreateReservationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'accommodation/:id',
    component: AccommodationDetail,
    canActivate: [AuthGuard],
  },

  {
    path: 'create-accommodation',
    component: CreateAccommodationComponent,
    canActivate: [RoleGuard],
  },
  { path: 'chat', component: Chat },

  { path: 'map', component: HomeMap },

  {
    path: 'reservations/:id',
    component: ReservationDetail,
    canActivate: [AuthGuard],
  },

  {
    path: 'edit-accommodation/:id',
    component: EditAccommodationFormComponent
  },

  // ⬇️ SIEMPRE AL FINAL
  { path: '**', redirectTo: 'landing' },
];
