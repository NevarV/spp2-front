import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  tinyComponent = false;
  resetForm = true;

  constructor(private router: Router) {
  }

  showForm() {
    this.resetForm = false;
    this.router.navigate(['/form']);
  }

  showUsers() {
    this.router.navigate(['/home']);
  }
}
