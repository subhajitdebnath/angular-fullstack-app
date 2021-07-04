import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BackendService} from '../services/backend.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  posts = [];
  data1 = null;
  users = [];

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // console.log(params.id);
    });

    // this.getBackendData();

    this.getAllPosts();
  }


  getBackendData() {
    console.log(this.backendService.getData());
  }

  getAllPosts() {
    this.backendService.getPosts().subscribe((res: any) => {
      this.users = res.users;
      console.log(this.users);
      // this.posts = res;
      // console.log(this.posts);
    }, err => {
      console.log(err);
      // alert('please try again later');
    });
  }

}