import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {MetricaContrato, MetricasContratoRelations} from '../models';

export class MetricaContratoRepository extends DefaultCrudRepository<
    MetricaContrato,
    typeof MetricaContrato.prototype.id,
    MetricasContratoRelations
> {
    constructor(
        @inject('datasources.contractusDataSource')
        dataSource: ContractusDataSource,
    ) {
        super(MetricaContrato, dataSource);
    }
}
