import {IPageRoute, PageStore} from "./PageStore";
import {IInitialState} from "../utils/interfaces";
import {createRouterState} from "mobx-state-router";
import {generateRoutes} from "../utils/generateRoutes";
import {RouterStore} from "./RouterStore";

const notFound = createRouterState('notFound');

export class RootStore {
    routerStore: RouterStore;
    pageStore: PageStore;

    constructor(routes: IPageRoute[], initialState: IInitialState) {
        this.routerStore = new RouterStore(generateRoutes(routes), notFound, {rootStore: this});
        this.pageStore = new PageStore(this);
    }

}