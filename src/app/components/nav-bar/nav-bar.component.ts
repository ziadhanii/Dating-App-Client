import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {AccountService} from '../../core/services/account.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CollapseModule} from 'ngx-bootstrap/collapse';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive, CollapseModule,
    BsDropdownModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  accountService = inject(AccountService);
  router = inject(Router);
  toastr = inject(ToastrService);
  model: any = {};
  isNavbarCollapsed = true;


  login() {
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
      },
      error: error => this.toastr.error(error.error),
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
