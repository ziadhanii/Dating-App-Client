import { Member } from '../../../core/models/member';
import { MemberService } from './../../../core/services/member.service';
import { Component, inject, OnInit } from '@angular/core';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {

  memberService = inject(MemberService);

  ngOnInit(): void {
    this.loadMembers();
    if (this.memberService.members().length === 0) this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers();
  }

}
