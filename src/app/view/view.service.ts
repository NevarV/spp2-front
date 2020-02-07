import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  formVisible = false;
  resetForm = true;

  constructor() {
  }

  changeComponent(resetForm: boolean) {
    this.resetForm = resetForm;
    this.formVisible = !this.formVisible;
  }
}
