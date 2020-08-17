import { Thing } from '../shared/thing.model';
import { Subject } from 'rxjs';

export class HaveListService {
  thingsChanged = new Subject<Thing[]>();
  startedEditing = new Subject<number>();
  private things: Thing[] = [
    new Thing('Love'),
    new Thing('A hilarious dad'),
  ];

  getThings() {
    return this.things.slice();
  }

  getThing(index: number) {
    return this.things[index];
  }

  addThing(thing: Thing) {
    // console.log(thing)
    this.things.push(thing);
    this.thingsChanged.next(this.things.slice());
  }

  addThings(things: Thing[]) {
    // for (let thing of things) {
    //   this.addThing(thing);
    // }
    this.things.push(...things);
    this.thingsChanged.next(this.things.slice());
  }

  updateThing(index: number, newThing: Thing) {
    this.things[index] = newThing;
    this.thingsChanged.next(this.things.slice());
  }

  deleteThing(index: number) {
    this.things.splice(index, 1);
    this.thingsChanged.next(this.things.slice());
  }
}
