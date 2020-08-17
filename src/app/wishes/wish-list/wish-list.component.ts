import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Wish } from '../wish.model';
import { WishService } from '../wish.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  group
} from '@angular/animations';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
  // animations: [
  //   trigger('wish', [
  //     state('in', style({
  //       opacity: 1,
  //       transform: 'translateX(0)'
  //     })),
  //     transition('void => *', [
  //       animate(500, keyframes([
  //         style({
  //           transform: 'translateX(-50px)',
  //           opacity: 0,
  //           offset: 0
  //         }),
  //         style({
  //           transform: 'translateX(-50px)',
  //           opacity: 0.5,
  //           offset: 0.3
  //         }),
  //         style({
  //           transform: 'translateX(-20px)',
  //           opacity: 1,
  //           offset: 0.8
  //         }),
  //         style({
  //           transform: 'translateX(0px)',
  //           opacity: 1,
  //           offset: 1
  //         })
  //       ]))
  //     ])
  //   ])],
})
export class WishListComponent implements OnInit, OnDestroy {
  wishes: Wish[];
  subscription: Subscription;

  constructor(private wishService: WishService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.wishService.wishesChanged
      .subscribe(
        (wishes: Wish[]) => {
          this.wishes = wishes;
        }
      );
    this.wishes = this.wishService.getWishes();
  }

  onNewWish() {
    this.router.navigate(['new'], {relativeTo: this.route});

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
