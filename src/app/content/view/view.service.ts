import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  tinyComponent = false;

  constructor(private router: Router) {
  }

  showUsers() {
    this.router.navigate(['/home']);
  }
}
