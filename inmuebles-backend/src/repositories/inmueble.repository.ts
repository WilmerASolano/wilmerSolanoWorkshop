import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, TipoInmueble} from '../models';
import {TipoInmuebleRepository} from './tipo-inmueble.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly tipoInmueble: BelongsToAccessor<TipoInmueble, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource, @repository.getter('TipoInmuebleRepository') protected tipoInmuebleRepositoryGetter: Getter<TipoInmuebleRepository>,
  ) {
    super(Inmueble, dataSource);
    this.tipoInmueble = this.createBelongsToAccessorFor('tipoInmueble', tipoInmuebleRepositoryGetter,);
    this.registerInclusionResolver('tipoInmueble', this.tipoInmueble.inclusionResolver);
  }
}
