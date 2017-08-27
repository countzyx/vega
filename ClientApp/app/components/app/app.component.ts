<<<<<<< HEAD
import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
=======
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from "ngx-toastr";
>>>>>>> 38a971f26e06ae4f77ab7cf42e72ce42395d7523

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
<<<<<<< HEAD
export class AppComponent {
    constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
=======
export class AppComponent implements OnInit {
    @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

    constructor(private toastrService: ToastrService) {}

    ngOnInit() {
        this.toastrService.overlayContainer = this.toastContainer;
>>>>>>> 38a971f26e06ae4f77ab7cf42e72ce42395d7523
    }
}
