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


  create(vehicle) {
    return this.http.post('/api/vehicles', vehicle).map(res => res.json());
  }
}
