import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import {DataStorageService} from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private loggingService: LoggingService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.dataStorageService.fetchWishes().subscribe();
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}
