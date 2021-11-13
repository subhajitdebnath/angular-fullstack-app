import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userInfo = null;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.authService.data.subscribe(userInfo => {
      //do what ever needs doing when data changes
      console.log(userInfo);
      this.userInfo = userInfo;
    })
  }

}
