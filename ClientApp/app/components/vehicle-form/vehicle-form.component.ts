import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css'],
  providers: [VehicleService, ToastrService]
})
export class VehicleFormComponent implements OnInit {
  features: any[];
  makes: any[];
  models: any[];
  vehicle: any = {
    features: [],
    contact: {}
  };

  constructor(
    private vehicleService: VehicleService,
<<<<<<< HEAD
    private toastr: ToastsManager
=======
    private toastrService: ToastrService
>>>>>>> 38a971f26e06ae4f77ab7cf42e72ce42395d7523
  ) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(makes => {
      this.makes = makes;
      console.log("MAKES", this.makes);
    });

    this.vehicleService.getFeatures().subscribe(features => {
      this.features = features;
      console.log("FEATURES", this.features)
    });
  }


  onMakeChange() {
    console.log("VEHICLE", this.vehicle);
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
  }

  onFeatureToggle(featureId, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(featureId);
    } else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    this.vehicleService.create(this.vehicle).subscribe(
      v => console.log(v),
<<<<<<< HEAD
      err => this.toastr.error(
        "An unexpected error has occurred.",
        "Error",
        {
          dismiss: "auto",
          toastLife: 5000,
          showCloseButton: true,
          positionClass: "toast-top-right"
        }
      )
    );
=======
      err => {
        this.toastrService.error(
          "An unexpected error has occurred.",
          "Error",
          {
            closeButton: true,
            timeOut: 5000
          }
        )
      });
>>>>>>> 38a971f26e06ae4f77ab7cf42e72ce42395d7523
  }
}