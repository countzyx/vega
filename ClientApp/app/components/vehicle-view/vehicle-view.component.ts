import { ProgressService } from './../../services/progress.service';
import { PhotoService } from './../../services/photo.service';
import { VehicleService } from './../../services/vehicle.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/forkJoin';
import * as Raven from 'raven-js';

@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.css'],
  providers: [VehicleService, 
    PhotoService,
    ProgressService
  ]
})
export class VehicleViewComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  photos: any[];
  vehicle: any;
  vehicleId: number;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastyService: ToastyService,
    private vehicleService: VehicleService,
    private photoService: PhotoService,
    private progressService: ProgressService
  ) {
    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return;
      }
    })
  }

  ngOnInit() {
    var sources = [
      this.vehicleService.getVehicle(this.vehicleId),
      this.photoService.getPhotos(this.vehicleId)
    ];

    Observable.forkJoin(sources).subscribe(data => {
      this.vehicle = data[0];
      this.photos = data[1];
    }, err => {
      Raven.captureException(err.originalError || err);
      if (err.status == 404)
        this.router.navigate(['/vehicles']);
    });
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id).subscribe(x => {
        this.router.navigate(['/vehicles']);
        this.toastyService.success({
          title: 'Success',
          msg: 'Vehicle Id ' + this.vehicle.id + ' was successfully deleted.',
          theme: 'bootstrap',
          showClose: true,
          timeout: 5000
        });
      });
    }
  }
  
  
  uploadPhoto() {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    this.progressService.uploadProgress.subscribe(p => console.log(p.status));
    this.photoService.upload(this.vehicleId, nativeElement.files[0])
      .subscribe(p => {
        this.photos.push(p);
      });
  }
}
