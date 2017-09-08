import { KeyValuePair } from './../../models/key.value.pair';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/forkJoin';
import { VehicleService } from './../../services/vehicle.service';
import { Vehicle } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
  providers: [VehicleService]
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  makes: KeyValuePair[];
  filter: any = {};

  constructor(
    private router: Router,
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getVehicles(this.filter)
    ];

    Observable.forkJoin(sources).subscribe(data => {
      this.makes = data[0];
      this.vehicles = data[1];
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/vehicles']);
    });
  }

  onFilterChange() {
    this.vehicleService.getVehicles(this.filter).subscribe(vehicles => this.vehicles = vehicles);
  }

  resetFilter() {
    this.filter = {}
    this.onFilterChange();
  }
}
