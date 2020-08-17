import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WishesComponent } from './wishes.component';
import { AuthGuard } from '../auth/auth.guard';
import { WishStartComponent } from './wish-start/wish-start.component';
import { WishEditComponent } from './wish-edit/wish-edit.component';
import { WishDetailComponent } from './wish-detail/wish-detail.component';
import { WishesResolverService } from './wishes-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: WishesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: WishStartComponent },
      { path: 'new', component: WishEditComponent },
      {
        path: ':id',
        component: WishDetailComponent,
        resolve: [WishesResolverService]
      },
      {
        path: ':id/edit',
        component: WishEditComponent,
        resolve: [WishesResolverService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WishesRoutingModule {}
