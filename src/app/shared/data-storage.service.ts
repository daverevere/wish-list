import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Wish } from '../wishes/wish.model';
import { WishService } from '../wishes/wish.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private wishService: WishService,
    private authService: AuthService
  ) {}

  storeWishes() {
    const wishes = this.wishService.getWishes();
    this.http
      .put(
        'database-url/wishes.json',
        wishes
      )
      .subscribe(response => {
        // console.log(response);
      });
  }

  fetchWishes() {
    return this.http
      .get<Wish[]>(
        'database-url/wishes.json'
      )
      .pipe(
        map(wishes => {
          return wishes.map(wish => {
            return {
              ...wish,
              things: wish.things ? wish.things : []
            };
          });
        }),
        tap(wishes => {
          this.wishService.setWishes(wishes);
        })
      );
  }
}
