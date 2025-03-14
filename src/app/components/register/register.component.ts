import {Component, inject, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AccountService} from '../../core/services/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  cancelRegister = output<boolean>();
  model: any = {}

  register() {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.router.navigateByUrl('/members');
        this.cancel();
      },
      error: error => this.toastr.error(error)
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
