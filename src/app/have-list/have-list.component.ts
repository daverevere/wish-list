import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Thing } from '../shared/thing.model';
import { HaveListService } from './have-list.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-have-list',
  templateUrl: './have-list.component.html',
  styleUrls: ['./have-list.component.css']
})
export class HaveListComponent implements OnInit, OnDestroy {
  things: Thing[];
  private subscription: Subscription;

  constructor(
    private slService: HaveListService,
    private loggingService: LoggingService
  ) {}

  ngOnInit() {
    this.things = this.slService.getThings();
    this.subscription = this.slService.thingsChanged.subscribe(
      (things: Thing[]) => {
        this.things = things;
      }
    );

    this.loggingService.printLog('Hello from HaveListComponent ngOnInit!');
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
