import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Member } from '../models/member';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  members = signal<Member[]>([]);

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'user').subscribe({
      next: members => this.members.set(members)
    })
  }

  getMemberByUsername(username: string) {
    const member = this.members().find(x => x.username === username);

    if (member !== undefined)
      return of(member);

    return this.http.get<Member>(this.baseUrl + 'user/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'user', member)
      .pipe(
        tap(() => {
          this.members
            .update(members => members
              .map(
                m => m.username === member.username
                  ? member : m))
        })
      )
  }
}
