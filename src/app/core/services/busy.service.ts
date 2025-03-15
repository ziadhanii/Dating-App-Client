import { NgxSpinnerService } from 'ngx-spinner';
import { Spinner } from './../../../../node_modules/ngx-spinner/lib/ngx-spinner.enum.d';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;

  private spinnerService = inject(NgxSpinnerService);

  busy() {
    this.busyRequestCount++;
    this.spinnerService.show(undefined, {
      type: 'ball-scale-multiple',
      bdColor: 'rgba(255,255,255,0)',
      color: '#333333'
    });
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }

}
