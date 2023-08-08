import { Component, OnInit } from '@angular/core';
import { FetchService } from './header/save&fetch-from-header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private fetch: FetchService){}
  ngOnInit() {
    this.fetch.onFetch();
  }
}
