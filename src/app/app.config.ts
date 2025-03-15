import { NgxSpinnerConfig } from './../../node_modules/ngx-spinner/lib/config.d';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { GALLERY_CONFIG, GalleryConfig } from 'ng-gallery';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor, jwtInterceptor, loadingInterceptor])),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true
    }),
    {
      provide: GALLERY_CONFIG,
      useValue: {
        autoHeight: true,
        imageSize: 'cover'
      } as GalleryConfig
    },
    importProvidersFrom(NgxSpinnerModule)
  ]
};
