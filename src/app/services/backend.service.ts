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

    return this.httpClient.get('http://localhost/php-rest/api/user-profile.php', header);
  }

}
