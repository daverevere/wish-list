import { Thing } from '../shared/thing.model';

export class Wish {
  public name: string;
  public description: string;
  public imagePath: string;
  public things: Thing[];

  constructor(name: string, desc: string, imagePath: string, things: Thing[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.things = things;
  }
}
