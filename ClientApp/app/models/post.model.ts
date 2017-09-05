import { IFilter } from '../interfaces/ifilter';

export class Post implements IFilter {
    title: string;
    body: string;

    get filter(): string { return this.title }
    isRaised: boolean;
}
