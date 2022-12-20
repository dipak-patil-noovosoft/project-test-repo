
import { RouterState, RouterStore } from 'mobx-state-router';
import {IPageRoute} from "../stores/PageStore";
import {NotFoundPageStore} from "../pages";


function resolve(obj: any) {
    return obj && obj.__esModule ? obj.default : obj;
}

function generatePageOnEnter(route: IPageRoute) {
    // Routes [- Example -]
    // {
    //     name: 'notFound',
    //     pattern: '/not-found',
    //     page: ()=> NotFoundPageStore
    // },

    let pagePromise: any;
    //creating onPageEnter method for route
    route.onPageEnter = (routerState: RouterState, routerStore: RouterStore) => {
        if (!pagePromise && route.page) {
            //API calls Promise resolve here
            pagePromise = Promise.resolve(route.page())
                .then(module => {
                    return resolve(module);
                })
                .catch(err => {
                    throw err;
                });
        }

        pagePromise.then((page: any) => {
            const {options: {rootStore, rootStore: {pageStore}}} = routerStore;
            pageStore.showPage(new page(rootStore, routerState.params, routerState.queryParams));
        });

        return pagePromise;
    };
}

export function generateRoutes(routes: IPageRoute[]) {
    // Routes [- Example -]
    // {
    //     name: 'notFound',
    //     pattern: '/not-found',
    //     page: ()=> NotFoundPageStore
    // },
    const generatedRoutes = [];
    for (const route of routes) {
        if (route.page) {
            // console.log(route)
            generatePageOnEnter(route);
        }
        generatedRoutes.push(route);
    }
    return generatedRoutes;
}
