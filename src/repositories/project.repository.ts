import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {Project, Region} from '../models';
import {RegionRepository} from './region.repository';
import {MysqlDataSource} from '../datasources';
import {Getter, inject} from '@loopback/core';

export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id
> {
  public readonly region: BelongsToAccessor<
    Region,
    typeof Project.prototype.id
  >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('RegionRepository')
    protected regionRepositoryGetter: Getter<RegionRepository>,
  ) {
    super(Project, dataSource);

    this.region = this.createBelongsToAccessorFor(
      'region',
      regionRepositoryGetter,
    );
  }
}
