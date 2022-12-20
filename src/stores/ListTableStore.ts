import {action, makeObservable, observable} from "mobx";

export interface IFilterable {
    setFilters(filter: string): any;
}

export type Fetcher = (params: {}) => Promise<IPaginator>;

export interface IPaginatorMeta {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface IPaginator {
    data: any[];
    links: any;
    meta: IPaginatorMeta;
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export class ListTableStore implements IFilterable {
    @observable isLoading = false;
    @observable page = 1;
    @observable perPage = 1;
    @observable items: any[] = [];
    @observable pagination: IPaginatorMeta | null = null;
    @observable paginationData: any;
    @observable orderColumn: string = '';
    @observable orderDirection: string = 'asc';
    onChangeCallback: (() => any) | undefined;

    filters: any = null;
    search: string | null = null;
    key = "id";
    @observable selectedKeys: any[] = [];

    protected readonly fetcher: Fetcher;

    constructor(fetcher: Fetcher, page: number, filters: any = null, perPage: number = 10, search: string | null = null) {
        makeObservable(this);
        this.fetcher = fetcher;
        this.page = page;
        this.perPage = perPage;
        this.filters = filters;
        this.search = search;
    }

    @action
    load() {
        this.fetchItems(this.page, this.perPage);
    }

    @action
    setOrder(column: string, direction: string) {
        this.orderColumn = column;
        this.orderDirection = direction;
    }

    @action
    fetchItems(page = 1, perPage = 10) {
        this.page = page;
        // Make sure selected page is already active in paginator before the items have been fetched
        if (this.pagination) {
            this.pagination.current_page = page;
        }
        this.perPage = perPage;
        this.isLoading = true;
        const sortData = (this.orderColumn) ? {orderColumn: this.orderColumn, orderDirection: this.orderDirection} : {};
        return this.fetcher({
            page: this.page,
            perPage: this.perPage,
            search: this.search,
            filters: this.filters,
            ...sortData
        }).then(this.setPaginator);
    }

    @action
    refresh = () => {
        this.deselectAllItems();
        return this.fetchItems(this.page, this.perPage);
    };

    @action
    setFilters = (filters: any) => {
        this.filters = filters;
        this.fetchItems(1, this.perPage);
    };

    @action
    setSearch = (search: string) => {
        this.search = search;
        this.fetchItems(1, this.perPage);
    };

    @action
    setPaginator = (paginator: IPaginator) => {
        this.isLoading = false;

        this.paginationData = paginator;

        if (paginator.meta !== undefined) {
            this.paginationData = paginator.meta;
        }

        this.pagination = {
            current_page: this.paginationData.current_page,
            from: this.paginationData.from,
            last_page: this.paginationData.last_page,
            path: this.paginationData.path,
            per_page: this.paginationData.per_page,
            to: this.paginationData.to,
            total: this.paginationData.total,
        };

        this.items = paginator.data;

        if (this.onChangeCallback) {
            this.onChangeCallback();
        }
    };

    @action
    selectItem(item: any) {
        this.selectedKeys.push(item[this.key]);
    }

    @action
    deselectItem(item: any) {
        this.selectedKeys = this.selectedKeys.filter((id: any) => id !== item[this.key]);
    }

    @action
    selectAllItems() {
        this.selectedKeys = this.items.map(item => item[this.key]);
    }

    @action
    deselectAllItems() {
        this.selectedKeys = [];
    }
}
