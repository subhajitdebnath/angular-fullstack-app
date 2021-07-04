import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private backendService: BackendService
  ) { }

  ngOnInit(): void {
    this.backendService.getProfile().subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err)
    })
  }

  logout() {
    localStorage.setItem('authData', null);
    this.router.navigate(['']);
  }

}
