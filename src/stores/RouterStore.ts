import { RouterState, RouterStore as NareshRouterStore } from 'mobx-state-router';

export class RouterStore extends NareshRouterStore {
    goTo(
        routeName: string,
        options: { [key: string]: any } = {}
    ): Promise<RouterState> {
        return super.goTo(routeName, options);
    }
}