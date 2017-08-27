import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
<<<<<<< HEAD
import { ToastModule } from 'ng2-toastr/ng2-toastr';
=======
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
>>>>>>> 38a971f26e06ae4f77ab7cf42e72ce42395d7523

import { VehicleService } from './services/vehicle.service';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent
    ],
    imports: [
        FormsModule,
<<<<<<< HEAD
        ToastModule.forRoot(),
=======
        ToastrModule.forRoot({positionClass: 'toast-top-right'}),
        ToastContainerModule.forRoot(),
>>>>>>> 38a971f26e06ae4f77ab7cf42e72ce42395d7523
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'vehicles/new', component: VehicleFormComponent },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        VehicleService
    ],
};
