import { AuthService } from './../../services/auth.service';
import { KeyValuePair } from './../../models/key.value.pair';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/forkJoin';
import { VehicleService } from './../../services/vehicle.service';
import { Vehicle } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';
import * as Raven from 'raven-js';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 3;
  queryResult: any = {};
  makes: KeyValuePair[];
  query: any = {
    pageSize: this.PAGE_SIZE
  };
  columns = [
    { title: 'Id' },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    {}
  ];

  constructor(
    private authService: AuthService,
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
      this.queryResult = data[1];
    }, err => {
      Raven.captureException(err.originalError || err);
      if (err.status == 404)
        this.router.navigate(['/vehicles']);
    });
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query).subscribe(result => this.queryResult = result);
  }


  onQueryChange() {
    this.query.page = 1;
    this.populateVehicles();
  }

  resetQuery() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.populateVehicles();
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

  onPageChange(page) {
    this.query.page = page;
    this.populateVehicles();
  }
}
