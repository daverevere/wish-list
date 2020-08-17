import { Component, OnInit, Input } from '@angular/core';

import { Wish } from '../../wish.model';

@Component({
  selector: 'app-wish-item',
  templateUrl: './wish-item.component.html',
  styleUrls: ['./wish-item.component.css']
})
export class WishItemComponent implements OnInit {
  @Input() wish: Wish;
  @Input() index: number;

  ngOnInit() {
  }
}
