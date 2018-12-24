import {Entity, model, property, hasMany} from '@loopback/repository';
import {Project} from './project.model';

@model()
export class Region extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => Project, {keyTo: 'regionId'})
  projects?: Project[];

  constructor(data?: Partial<Region>) {
    super(data);
  }
}
