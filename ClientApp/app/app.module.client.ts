import { AUTH_PROVIDERS } from 'angular2-jwt/angular2-jwt';
import { VehicleService } from './services/vehicle.service';
import { PhotoService } from './services/photo.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BrowserXhr } from '@angular/http';
import { AppErrorHandler } from './app.error-handler';
import { ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { sharedConfig } from './app.module.shared';
import { ProgressService, BrowserXhrWithProgress } from "./services/progress.service";
import { AdminAuthGuardService } from './services/admin-auth-guard.service';

@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: sharedConfig.declarations,
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        ...sharedConfig.imports
    ],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler },
        { provide: 'ORIGIN_URL', useValue: location.origin},
        AUTH_PROVIDERS,
        AuthService,
        AuthGuardService,
        AdminAuthGuardService,
        PhotoService,
        VehicleService
    ]
})
export class AppModule {
}
