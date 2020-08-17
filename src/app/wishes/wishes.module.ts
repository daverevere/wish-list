import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { WishesComponent } from './wishes.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { WishDetailComponent } from './wish-detail/wish-detail.component';
import { WishItemComponent } from './wish-list/wish-item/wish-item.component';
import { WishStartComponent } from './wish-start/wish-start.component';
import { WishEditComponent } from './wish-edit/wish-edit.component';
import { WishesRoutingModule } from './wishes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    WishesComponent,
    WishListComponent,
    WishDetailComponent,
    WishItemComponent,
    WishStartComponent,
    WishEditComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    WishesRoutingModule,
    SharedModule
  ]
})
export class WishesModule {}
