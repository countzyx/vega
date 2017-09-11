import { CanActivate } from '@angular/router';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminComponent } from './components/admin/admin.component';
import { AuthService } from './services/auth.service';
import { PhotoService } from './services/photo.service';
import { VehicleViewComponent } from './components/vehicle-view/vehicle-view.component';
import { PaginationComponent } from './components/shared/pagination.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';
import * as Raven from 'raven-js';
import { VehicleService } from './services/vehicle.service';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { AUTH_PROVIDERS } from "angular2-jwt/angular2-jwt";

Raven.config('https://5dcd4dc28a554703a9302f69e403d7a4@sentry.io/210557').install();

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        VehicleFormComponent,
        VehicleListComponent,
        VehicleViewComponent,
        PaginationComponent,
        AdminComponent
    ],
    imports: [
        FormsModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [AuthGuardService] },
            { path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [AuthGuardService] },
            { path: 'vehicles/:id', component: VehicleViewComponent },
            { path: 'vehicles', component: VehicleListComponent },
            { path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuardService] },
            { path: '**', redirectTo: 'vehicles' }
        ])
    ],
    providers: [
        AUTH_PROVIDERS,
        AuthService,
        AuthGuardService,
        AdminAuthGuardService,
        VehicleService,
        PhotoService
    ]
};
