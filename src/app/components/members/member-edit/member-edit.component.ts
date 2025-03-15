import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../../core/models/member';
import { MemberService } from '../../../core/services/member.service';
import { AccountService } from '../../../core/services/account.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', { static: false }) editForm?: NgForm;

  member?: Member;

  constructor(
    private accountService: AccountService,
    private memberService: MemberService,
    private toastr: ToastrService
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
    console.log(this.member);
    this.editForm?.reset(this.member);
    this.toastr.success('Profile updated successfully');
  }
}
