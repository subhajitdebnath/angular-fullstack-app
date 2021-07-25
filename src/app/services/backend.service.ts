import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  getData() {
    let data = [
      {
        id: 1,
        name: 'John'
      }
    ]
    return data;
  }

  getPosts() {
    // return this.httpClient.get('https://jsonplaceholder.typicode.com/postsss');
    return this.httpClient.get('http://localhost/full-stack/Apis/data.php');
  }

  register(payload: any) {
    return this.httpClient.post('http://localhost/php-rest/api/register.php', payload);
  }

  login(payload: any) {
    return this.httpClient.post('http://localhost/php-rest/api/login.php', payload);
  }

  getProfile() {

    const header = {
      headers: new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.authService.getToken())
    };

    const body = {
      id: this.authService.getLoggedInUserId()
    }

    return this.httpClient.post('http://localhost/php-rest/api/user-profile.php', body, header);
  }

  getAllPosts() {
    const header = {
      headers: new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.authService.getToken())
    };

    return this.httpClient.get('http://localhost/php-rest/api/get-all-posts.php', header);
  }

  createPost(payload) {

    const header = {
      headers: new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.authService.getToken())
    };

    return this.httpClient.post('http://localhost/php-rest/api/create-posts.php', payload, header);
  }

  getPostDetails(payload) {

    const header = {
      headers: new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.authService.getToken())
    };

    return this.httpClient.post('http://localhost/php-rest/api/get-post-details.php', payload, header);
  }

  getPostComments(payload) {

    const header = {
      headers: new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.authService.getToken())
    };

    return this.httpClient.post('http://localhost/php-rest/api/get-post-comments.php', payload, header);
  }

  getPostLikes(payload) {

    const header = {
      headers: new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.authService.getToken())
    };

    return this.httpClient.post('http://localhost/php-rest/api/get-post-likes.php', payload, header);
  }

  addRemoveLikes(payload) {

    const header = {
      headers: new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.authService.getToken())
    };

    return this.httpClient.post('http://localhost/php-rest/api/add-remove-like.php', payload, header);
  }

  createComment(payload) {

    const header = {
      headers: new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.authService.getToken())
    };

    return this.httpClient.post('http://localhost/php-rest/api/create-comment.php', payload, header);
  }

  getAllUsers(payload) {
    const header = {
      headers: new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.authService.getToken())
    };

    return this.httpClient.post('http://localhost/php-rest/api/get-all-users.php', payload, header);
  }

  getChatMessages(payload) {
    const header = {
      headers: new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.authService.getToken())
    };

    return this.httpClient.post('http://localhost/php-rest/api/get-chat-messages.php', payload, header);
  }

  sendChatMessages(payload) {
    const header = {
      headers: new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.authService.getToken())
    };

    return this.httpClient.post('http://localhost/php-rest/api/send-chat-messages.php', payload, header);
  }

}
