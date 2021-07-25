import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  post = null;
  comments = [];
  likes = [];
  likeCount = 0;
  likeText = "Like";
  commentForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required]],
    });
    this.route.params.subscribe(params => {
      // console.log(params.id);

      this.getPostDetails(params.id);
      this.getPostComments(params.id);
      this.getPostLikes(params.id);
    });
  }

  getPostDetails(postId) {
    const payload = {
      postId: postId
    };
    this.backendService.getPostDetails(payload).subscribe((data: any) => {
      this.post = data.data;
    }, err => {
      console.log(err)
    });
  }

  getPostComments(postId) {
    const payload = {
      postId: postId
    };
    this.backendService.getPostComments(payload).subscribe((data: any) => {
      this.comments = data.data;
    }, err => {
      console.log(err)
    });
  }

  getPostLikes(postId) {
    const payload = {
      postId: postId
    };
    this.backendService.getPostLikes(payload).subscribe((data: any) => {
      this.likes = data.data;
      this.likeCount = this.likes.length;

      // checking for like status of a user
      let likeState = this.likes.filter((like: any) => like.user.userId === this.authService.getLoggedInUserId());
      if (likeState.length === 0) {
        this.likeText = 'Like';
      } else {
        this.likeText = 'Unlike';
      }

    }, err => {
      console.log(err)
    });
  }

  addRemoveLike(postId) {
    const payload = {
      userId: this.authService.getLoggedInUserId(),
      postId: postId
    };
    this.backendService.addRemoveLikes(payload).subscribe((data: any) => {
      console.log(data);
      if (data.status === "add") {
        ++ this.likeCount;
        this.likeText = 'Unlike';
      } else if (data.status === "remove") {
        -- this.likeCount;
        this.likeText = 'Like';
      }
      // this.likes = data.data;
      // this.likeCount = this.likes.length;
    }, err => {
      console.log(err)
    });
  }

  commentSubmit(form: FormGroup) {
    console.log(form.value);

    const payload = {
      userId: this.authService.getLoggedInUserId(),
      postId: this.post.id,
      content: form.value.content
    }

    this.backendService.createComment(payload).subscribe(data => {
      // console.log(data);
      form.reset();
      this.toastr.success('Comment added successfully', 'Success');
      this.getPostComments(this.post.id);
    }, err => {
      console.log(err);
    });
  }

}
