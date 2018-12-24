import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository
} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Region, Project} from '../models';
import {ProjectRepository} from './project.repository';

export class RegionRepository extends DefaultCrudRepository<
  Region,
  typeof Region.prototype.id
> {
  public readonly projects: HasManyRepositoryFactory<
    Project,
    typeof Region.prototype.id
  >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('ProjectRepository')
    projectRepositoryGetter: Getter<ProjectRepository>,
  ) {
    super(Region, dataSource);
    this.projects = this.createHasManyRepositoryFactoryFor(
      'projects',
      projectRepositoryGetter,
    );
  }
}
