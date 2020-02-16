import { Component, OnInit } from '@angular/core';
import {ViewService} from '../../content/view/view.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit {

  constructor(private viewService: ViewService) { }

  ngOnInit() {
  }

}
