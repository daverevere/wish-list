import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Wish } from './wish.model';
import { Thing } from '../shared/thing.model';
import { HaveListService } from '../have-list/have-list.service';

@Injectable()
export class WishService {
  wishesChanged = new Subject<Wish[]>();

  // private wishes: Wish[] = [
  //   new Wish(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [new Thing('Meat', 1), new Thing('French Fries', 20)]
  //   ),
  //   new Wish(
  //     'Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [new Thing('Buns', 2), new Thing('Meat', 1)]
  //   )
  // ];
  private wishes: Wish[] = [];

  constructor(private slService: HaveListService) {}

  setWishes(wishes: Wish[]) {
    this.wishes = wishes;
    this.wishesChanged.next(this.wishes.slice());
  }

  getWishes() {
    return this.wishes.slice();
  }

  getWish(index: number) {
    return this.wishes[index];
  }

  addThingsToHaveList(things: Thing[]) {
    this.slService.addThings(things);
  }

  addWish(wish: Wish) {
    this.wishes.push(wish);
    this.wishesChanged.next(this.wishes.slice());
  }

  updateWish(index: number, newWish: Wish) {
    this.wishes[index] = newWish;
    this.wishesChanged.next(this.wishes.slice());
  }

  deleteWish(index: number) {
    this.wishes.splice(index, 1);
    this.wishesChanged.next(this.wishes.slice());
  }
}
