import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitForm = false;

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // this.toastr.error('Failed', 'error occurred');
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  loginSubmit(form: FormGroup) {
    this.submitForm = true;
    // console.log(form.value);

    this.backendService.login(form.value).subscribe(data => {
      console.log(data);
      this.toastr.success('Login Success!', 'Success');

      // setting login info to the localstorage
      localStorage.setItem('authData', JSON.stringify(data));
      this.router.navigate(['home']);
    }, err => {
      console.log(err);
    });
  }

}
