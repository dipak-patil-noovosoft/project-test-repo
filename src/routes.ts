import {DashboardPageStore} from "./pages/DashboardPage";
import {NotFoundPageStore} from "./pages";
import {HomeTestPageStore} from "./pages/HomeTestPage";
import {DetailsPageStore} from "./pages/DetailsPage";
import {IPageRoute} from "./stores/PageStore";

export const routes: IPageRoute[] = [
    {
        name: 'notFound',
        pattern: '/not-found',
        page: () => NotFoundPageStore,
    },
    {
        name: 'Dashboard',
        pattern: '/',
        page: () => DashboardPageStore
    },
    {
        name: 'HomeTest',
        pattern: '/home-test',
        page: () => HomeTestPageStore,
    },
    {
        name: 'Details',
        pattern: '/details',
        page: () => DetailsPageStore,
    },
];