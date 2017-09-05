import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IFilter } from './ifilter';
import { ContainerDataSource } from '../datasources/container.datasource';

export interface IService<T extends IFilter> {
    data: BehaviorSubject<Array<T>>;
    setContainerSource(dataSource: ContainerDataSource<T>);
}
