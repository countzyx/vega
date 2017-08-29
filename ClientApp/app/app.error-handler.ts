import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ErrorHandler, Inject } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
    constructor(@Inject(ToastsManager) private toastr:ToastsManager) { }

    handleError(error: any): void {
        this.toastr.error(
            "An unexpected error has occurred.",
            "Error",
            {
              dismiss: "auto",
              toastLife: 5000,
              showCloseButton: true,
              positionClass: "toast-top-right"
            }
        );
    }
}