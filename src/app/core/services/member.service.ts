import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountService } from './account.service';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient, private accountService: AccountService) { }
  baseUrl = environment.apiUrl;

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'user');
  }

  getMemberByUsername(username: string) {
    return this.http.get<Member>(this.baseUrl + 'user/' + username);
  }


}
