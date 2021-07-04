import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-fulstack-app';

  persons = [
    'Tom',
    'John'
  ];

  realPersons = [
    {
      id: 1,
      name: 'Tom',
      email: 'tom@mail.com',
      age: 51
    },
    {
      id: 2,
      name: 'John',
      email: 'john@mail.com',
      age: 20
    }
  ];

  changeTitle () {
    this.title = 'Changed the title from button click';
  }
}
