import { SaveVehicle } from './../models/save.vehicle';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {

  constructor(private http: Http) { }

  getFeatures() { 
    return this.http.get('http://localhost:5000/api/features').map(res => res.json()) 
  }


  getMakes() {
    return this.http.get('http://localhost:5000/api/makes').map(res => res.json());
  }


  create(vehicle: SaveVehicle) {
    return this.http.post('http://localhost:5000/api/vehicles', vehicle).map(res => res.json());
  }


  update(vehicle: SaveVehicle) {
    return this.http.put('http://localhost:5000/api/vehicles/' + vehicle.id, vehicle).map(res => res.json());
  }

  getVehicle(id: number) {
    return this.http.get('http://localhost:5000/api/vehicles/' + id).map(res => res.json());
  }
}
