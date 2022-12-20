import {Route, RouterState, RouterStore} from "mobx-state-router";
import {RootStore} from "./RootStore";
import {action, makeObservable, observable, reaction} from "mobx";
import {routeMiddleware} from "../utils/middleware";

export interface IPageRoute extends Route {
    page?(): any;

    middleware?: any[];

    onPageEnter?(routerState: RouterState, routerStore: RouterStore): void;
}

export class PageStore {
    rootStore: RootStore;
    currentPageLoadPromise: any;
    @observable currentPage: any;
    @observable pageTitle: string = '';

    constructor(rootStore: RootStore) {
        makeObservable(this);
        this.rootStore = rootStore;
        this.observeRouterStateChanges();
    }

    @action
    showPage(page: any) {
        this.currentPage = page;
        this.currentPageLoadPromise = Promise.resolve(page.load());
    }

    @action
    setPageTitle(pageTitle: string) {
        this.pageTitle = pageTitle;
    }

    observeRouterStateChanges = () => {
        reaction(
            () => this.rootStore.routerStore.routerState,
            (routerState) => {
                const route: IPageRoute | undefined = this.rootStore.routerStore.getRoute(routerState.routeName);
                if (route?.middleware) {
                    route.middleware
                        .reduce((promise: Promise<void>, hook) => {
                            const hookSplit = hook.split(':');
                            const middleware: any = routeMiddleware[hookSplit[0]];
                            let params: [] = [];
                            if (hookSplit[1]) {
                                params = hookSplit[1].split('|');
                            }
                            return middleware
                                ? promise.then(() => middleware(routerState, this.rootStore.routerStore, params))
                                : promise;
                        }, Promise.resolve())
                        .then(() => {
                            if (route.page && route.onPageEnter) {
                                route.onPageEnter(routerState, this.rootStore.routerStore);
                            }
                        })
                        .catch((error: any) => {
                        });
                } else {
                    if (route?.page && route.onPageEnter) {
                        route.onPageEnter(routerState, this.rootStore.routerStore);
                    }
                }
            },
            {
                onError: (e) => {
                    throw new Error(e);
                },
            }
        );
    };

}