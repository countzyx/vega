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
  query: any = {};
  columns = [
    { title: 'Id' },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    {}
  ];

  constructor(
    private router: Router,
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getVehicles(this.query)
    ];

    Observable.forkJoin(sources).subscribe(data => {
      this.makes = data[0];
      this.vehicles = data[1];
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/vehicles']);
    });
  }

  populateVehicles() {
    this.vehicleService.getVehicles(this.query).subscribe(vehicles => this.vehicles = vehicles);
  }


  onQueryChange() {
    this.populateVehicles();
  }

  resetQuery() {
    this.query = {}
    this.onQueryChange();
  }

  sortBy(columnName) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }
}
