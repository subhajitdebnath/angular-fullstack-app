import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.scss']
})
export class FriendRequestComponent implements OnInit {

  friendRequests: any[] = [];

  constructor(
    private backendService: BackendService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllFriendRequests();
  }

  getAllFriendRequests() {
    const payload = {
      userId: this.authService.getLoggedInUserId()
    }
    this.backendService.getAllFR(payload).subscribe((data: any) => {
      this.friendRequests = data.friendRequests;
      // console.log(this.friendRequests)
    }, err => {
      console.log(err)
    });
  }

  manageFriendRequest(request, acceptance) {

    const payload = {
      fromUserId: request.userId,
      toUserId: this.authService.getLoggedInUserId(),
      acceptance: acceptance
    };
    this.backendService.manageFR(payload).subscribe((data: any) => {
      if (data.status === 'success') {
        this.toastr.success(data.message, 'Success');
      } else {
        this.toastr.error(data.message, 'Error');
      }
      this.getAllFriendRequests();
    }, err => {
      console.log(err)
    });
  }

}
