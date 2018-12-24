import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Project} from '../models';
import {RegionRepository} from '../repositories';

export class RegionProjectController {
  constructor(
    @repository(RegionRepository)
    protected regionRepo: RegionRepository,
  ) {}

  @post('/regions/{id}/projects', {
    responses: {
      '200': {
        description: 'Region.Project model instance',
        content: {'application/json': {schema: {'x-ts-type': Project}}},
      },
    },
  })
  async create(
    @param.path.number('id') id: number,
    @requestBody() project: Project
  ): Promise<Project> {
    return await this.regionRepo.projects(id).create(project);
  }

  @get('/regions/{id}/projects', {
    responses: {
      '200': {
        description: "Array of Projects belonging to Region",
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Project}},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter,
  ): Promise<Project[]> {
    return await this.regionRepo.projects(id).find(filter);
  }

  @patch('/regions/{id}/projects', {
    responses: {
      '200': {
        description: 'Region.Project PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody() project: Partial<Project>,
    @param.query.object('where', getWhereSchemaFor(Project)) where?: Where,
  ): Promise<Count> {
    return await this.regionRepo.projects(id).patch(project, where);
  }

  @del('/regions/{id}/projects', {
    responses: {
      '200': {
        description: 'Region.Project DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Project)) where?: Where,
  ): Promise<Count> {
    return await this.regionRepo.projects(id).delete(where);
  }
}
