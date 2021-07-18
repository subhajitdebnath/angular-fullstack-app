import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts = [];
  postForm: FormGroup;

  constructor(
    private router: Router,
    private backendService: BackendService,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      content: ['', [Validators.required]],
    });
    this.getProfile();
    this.getAllPosts();
  }

  logout() {
    localStorage.setItem('authData', null);
    this.router.navigate(['']);
  }

  getProfile() {
    this.backendService.getProfile().subscribe(data => {
      // console.log(data);
    }, err => {
      console.log(err)
    });
  }

  getAllPosts() {
    this.backendService.getAllPosts().subscribe((data: any) => {
      this.posts = data.data;
      console.log(this.posts)
    }, err => {
      console.log(err)
    });
  }

  postSubmit(form: FormGroup) {
    console.log(form.value);

    const payload = {
      userId: this.authService.getLoggedInUserId(),
      content: form.value.content
    }

    this.backendService.createPost(payload).subscribe(data => {
      // console.log(data);
      form.reset();
      this.toastr.success('Post added successfully', 'Success');
      this.getAllPosts();
    }, err => {
      console.log(err);
    });
  }

}
