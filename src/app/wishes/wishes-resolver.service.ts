import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Wish } from './wish.model';
import { DataStorageService } from '../shared/data-storage.service';
import { WishService } from './wish.service';

@Injectable({ providedIn: 'root' })
export class WishesResolverService implements Resolve<Wish[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private wishesService: WishService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const wishes = this.wishesService.getWishes();

    if (wishes.length === 0) {
      return this.dataStorageService.fetchWishes();
    } else {
      return wishes;
    }
  }
}
