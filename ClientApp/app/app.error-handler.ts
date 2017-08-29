import { ToastyService } from 'ng2-toasty';
import { ErrorHandler, Inject, NgZone } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
    constructor(
        private ngZone: NgZone,
        @Inject(ToastyService) private toastyService: ToastyService
    ) { }

    handleError(error: any): void {
        console.log("ERROR - " + error);
        if (typeof(window) !== 'undefined') { // To avoid issues with server-side prerender.
            this.ngZone.run(() => { // This is a fancy wrapper for setTimeout that triggers Angular's change detection.
                this.toastyService.error({
                    title: "Error",
                    msg: "An unexpected error has occurred.",
                    theme: "bootstrap",
                    showClose: true,
                    timeout: 5000
                });
            });
        }
    }
}