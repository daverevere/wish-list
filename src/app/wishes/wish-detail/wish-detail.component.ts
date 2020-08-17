import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Wish } from '../wish.model';
import { WishService } from '../wish.service';

@Component({
  selector: 'app-wish-detail',
  templateUrl: './wish-detail.component.html',
  styleUrls: ['./wish-detail.component.css']
})
export class WishDetailComponent implements OnInit {
  wish: Wish;
  id: number;

  constructor(private wishService: WishService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.wish = this.wishService.getWish(this.id);
        }
      );
  }

  onAddToHaveList() {
    this.wishService.addThingsToHaveList(this.wish.things);
  }

  onEditWish() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteWish() {
    this.wishService.deleteWish(this.id);
    this.router.navigate(['/wishes']);
  }

}
