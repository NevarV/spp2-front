import {Component} from '@angular/core';
import {ViewService} from './content/view/view.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'front-project';

  constructor(private viewService: ViewService, private router: Router) {
  }
}
