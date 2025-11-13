(window as any).global = window;
(globalThis as any).global = globalThis;
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './app/interceptors/auth-interceptor';

bootstrapApplication(App, {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([AuthInterceptor]))],
}).catch((err) => console.error(err));

[
  'https://res.cloudinary.com/miviaje/image/upload/v12345/alojamiento1/img1.jpg',
  'https://res.cloudinary.com/miviaje/image/upload/v12345/alojamiento1/img2.jpg',
];
