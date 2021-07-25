import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users = [];

  constructor(
    private backendService: BackendService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    const payload = {
      userId: this.authService.getLoggedInUserId()
    }
    this.backendService.getAllUsers(payload).subscribe((data: any) => {
      this.users = data.data;
    }, err => {
      console.log(err)
    });
  }

}
