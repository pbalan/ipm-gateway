import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Region} from './region.model';

@model()
export class Project extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  short_desc: string;

  @property({
    type: 'string',
  })
  description?: string;

  @belongsTo(() => Region)
  regionId: number;

  constructor(data?: Partial<Project>) {
    super(data);
  }
}
