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
  allVehicles: Vehicle[];
  makes: KeyValuePair[];
  filter: any = {};

  constructor(
    private router: Router,
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    this.vehicleService.getVehicles().subscribe(vehicles => this.vehicles = vehicles);
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getVehicles()
    ];

    Observable.forkJoin(sources).subscribe(data => {
      this.makes = data[0];
      this.vehicles = this.allVehicles = data[1];
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/vehicles']);
    });
  }

  onFilterChange() {
    var vehicles = this.allVehicles;

    if (this.filter.makeId)
      vehicles = vehicles.filter(v => v.make.id == this.filter.makeId)

    this.vehicles = vehicles;
  }

  resetFilter() {
    this.filter = {}
    this.onFilterChange();
  }
}
