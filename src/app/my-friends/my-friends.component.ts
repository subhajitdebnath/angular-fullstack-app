import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.scss']
})
export class MyFriendsComponent implements OnInit {

  friends: any[] = [];

  constructor(
    private backendService: BackendService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllFriends();
  }

  getAllFriends() {
    const payload = {
      userId: this.authService.getLoggedInUserId()
    }
    this.backendService.getAllFriends(payload).subscribe((data: any) => {
      this.friends = data.friends;
      // console.log(this.friends)
    }, err => {
      console.log(err)
    });
  }

}
