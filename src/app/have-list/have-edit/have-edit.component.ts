import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Thing } from '../../shared/thing.model';
import { HaveListService } from '../have-list.service';

@Component({
  selector: 'app-have-edit',
  templateUrl: './have-edit.component.html',
  styleUrls: ['./have-edit.component.css']
})
export class HaveEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Thing;

  constructor(private slService: HaveListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getThing(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            // amount: this.editedItem.amount
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newThing = new Thing(value.name);
    if (this.editMode) {
      this.slService.updateThing(this.editedItemIndex, newThing);
    } else {
      this.slService.addThing(newThing);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteThing(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
