import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../../core/models/member';
import { MemberService } from '../../../core/services/member.service';
import { AccountService } from '../../../core/services/account.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', { static: false }) editForm?: NgForm;

  @HostListener('window:beforeunload', ['$event'])
  notify($event: any) {
    if (this.editForm?.dirty) {
      $event.preventDefault();
    }
  }


  member?: Member;

  constructor(
    private accountService: AccountService,
    private memberService: MemberService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadMemberData();
  }

  loadMemberData() {
    const user = this.accountService.currentUser();
    if (!user) return;

    this.memberService.getMemberByUsername(user.userName).subscribe({
      next: (member) => (this.member = member),
      error: (err) => this.toastr.error('Failed to load member data')
    });
  }


  updateMember() {
    if (!this.member) return;

    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: _ => {
        this.toastr.success('Profile updated successfully');
        this.editForm?.reset(this.member);
        this.router.navigate(['/members/' + this.member?.username]);
      },
      error: (err) => this.toastr.error('Failed to update member data')
    });
  }
}
