import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent implements OnInit {

  toUserId = null;
  messages = [];
  sender = null;
  receiver = null;
  currentUser = null;
  chatForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.chatForm = this.fb.group({
      text: ['', [Validators.required]],
    });
    this.route.params.subscribe(params => {
      this.toUserId = params.toUserId;
    });

    
    this.getChatMessages();
    setInterval(() => {
      this.getChatMessages(); // try to use https://socket.io/
    }, 3000);

    this.currentUser = this.authService.getLoggedInUserId();
  }

  getChatMessages() {
    const payload = {
      fromUserId: this.authService.getLoggedInUserId(),
      toUserId: this.toUserId
    };
    this.backendService.getChatMessages(payload).subscribe((data: any) => {
      this.messages = data.messages;
      this.sender = data.sender;
      this.receiver = data.receiver;
    }, err => {
      console.log(err)
    });
  }

  chatSubmit(form: FormGroup) {
    console.log(form.value);

    const payload = {
      fromUserId: this.authService.getLoggedInUserId(),
      toUserId: this.toUserId,
      text: form.value.text
    }

    this.backendService.sendChatMessages(payload).subscribe(data => {
      form.reset();
      this.getChatMessages();
    }, err => {
      console.log(err);
    });
  }

}
