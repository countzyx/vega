import { SaveVehicle } from './../models/save.vehicle';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {
  vehiclesEndpoint = "http://localhost:5000/api/vehicles/";

  constructor(private http: Http) { }

  getFeatures() { 
    return this.http.get('http://localhost:5000/api/features').map(res => res.json()) 
  }


  getMakes() {
    return this.http.get('http://localhost:5000/api/makes').map(res => res.json());
  }


  create(vehicle: SaveVehicle) {
    return this.http.post(this.vehiclesEndpoint.slice(0, -1), vehicle).map(res => res.json());
  }


  update(vehicle: SaveVehicle) {
    return this.http.put(this.vehiclesEndpoint + vehicle.id, vehicle).map(res => res.json());
  }

  getVehicle(id: number) {
    return this.http.get(this.vehiclesEndpoint + id).map(res => res.json());
  }

  getVehicles(filter) {
    return this.http.get(this.vehiclesEndpoint.slice(0, -1) + this.toQueryString(filter)).map(res => res.json());
  }

  toQueryString(obj) {
    var parts = [];
    for (var prop in obj) {
      var value = obj[prop];
      if (value != null && value != undefined) {
        parts.push(encodeURIComponent(prop) + "=" + encodeURIComponent(value));
      }
    }

    return "?" + parts.join("&");
  }
  
  delete(id: number) {
    return this.http.delete(this.vehiclesEndpoint + id).map(res => res.json());
  }  
}
