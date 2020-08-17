import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HaveListComponent } from './have-list.component';
import { HaveEditComponent } from './have-edit/have-edit.component';
import { SharedModule } from '../shared/shared.module';
import { LoggingService } from '../logging.service';

@NgModule({
  declarations: [HaveListComponent, HaveEditComponent],
  imports: [
    FormsModule,
    RouterModule.forChild([{ path: '', component: HaveListComponent }]),
    SharedModule
  ],
  // providers: [LoggingService]
})
export class HaveListModule {}
