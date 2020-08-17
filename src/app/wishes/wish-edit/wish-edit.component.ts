import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { WishService } from '../wish.service';
import {DataStorageService} from '../../shared/data-storage.service';

@Component({
  selector: 'app-wish-edit',
  templateUrl: './wish-edit.component.html',
  styleUrls: ['./wish-edit.component.css']
})
export class WishEditComponent implements OnInit {
  id: number;
  editMode = false;
  wishForm: FormGroup;

  get thingsControls() {
    return (this.wishForm.get('things') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private wishService: WishService,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.wishService.updateWish(this.id, this.wishForm.value);
    } else {
      this.wishService.addWish(this.wishForm.value);
      this.dataStorageService.storeWishes();
    }
    this.onCancel();
  }

  onAddThing() {
    (<FormArray>this.wishForm.get('things')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteThing(index: number) {
    (<FormArray>this.wishForm.get('things')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let wishName = '';
    let wishImagePath = '';
    let wishDescription = '';
    let wishThings = new FormArray([]);

    if (this.editMode) {
      const wish = this.wishService.getWish(this.id);
      wishName = wish.name;
      wishImagePath = wish.imagePath;
      wishDescription = wish.description;
      if (wish['things']) {
        for (let thing of wish.things) {
          wishThings.push(
            new FormGroup({
              name: new FormControl(thing.name, Validators.required)
            })
          );
        }
      }
    }

    this.wishForm = new FormGroup({
      name: new FormControl(wishName, Validators.required),
      imagePath: new FormControl(wishImagePath, Validators.required),
      description: new FormControl(wishDescription, Validators.required),
      things: wishThings
    });
  }
}
