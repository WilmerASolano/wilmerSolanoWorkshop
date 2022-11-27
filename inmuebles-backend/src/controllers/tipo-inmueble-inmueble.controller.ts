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
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  TipoInmueble,
  Inmueble,
} from '../models';
import {TipoInmuebleRepository} from '../repositories';

export class TipoInmuebleInmuebleController {
  constructor(
    @repository(TipoInmuebleRepository) protected tipoInmuebleRepository: TipoInmuebleRepository,
  ) { }

  @get('/tipo-inmuebles/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Array of TipoInmueble has many Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmueble)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Inmueble>,
  ): Promise<Inmueble[]> {
    return this.tipoInmuebleRepository.inmuebles(id).find(filter);
  }

  @post('/tipo-inmuebles/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'TipoInmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmueble)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TipoInmueble.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {
            title: 'NewInmuebleInTipoInmueble',
            exclude: ['id'],
            optional: ['tipoInmuebleId']
          }),
        },
      },
    }) inmueble: Omit<Inmueble, 'id'>,
  ): Promise<Inmueble> {
    return this.tipoInmuebleRepository.inmuebles(id).create(inmueble);
  }

  @patch('/tipo-inmuebles/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'TipoInmueble.Inmueble PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {partial: true}),
        },
      },
    })
    inmueble: Partial<Inmueble>,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.tipoInmuebleRepository.inmuebles(id).patch(inmueble, where);
  }

  @del('/tipo-inmuebles/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'TipoInmueble.Inmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.tipoInmuebleRepository.inmuebles(id).delete(where);
  }
}
