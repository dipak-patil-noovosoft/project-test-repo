import React, {useContext} from "react";
import {RootStore} from "../../stores/RootStore";

export interface IAppContextProps {
    rootStore: RootStore;
}

// export const AppContext = React.createContext({});
//
// export const AppContextProvider = (props: {rootStore: RootStore, children: any}) => (
//     <AppContext.Provider value={{rootStore: props.rootStore}}>
//         {props.children}
//     </AppContext.Provider>
// );

export const RootStoreContext = React.createContext({});

export function useRootStore(): RootStore {
    const rootStore = useContext(RootStoreContext);
    if (rootStore === undefined) {
        /* istanbul ignore next */
        throw new Error('useRootStore must be used within a RootStoreProvider');
    }
    return rootStore as RootStore;
}



// import React, { useContext } from 'react';
// import { RouterStore } from '../stores';
//
// // ---------- RouterContext ----------
// export const RouterContext = React.createContext<RouterStore | undefined>(
//     undefined
// );
//
// // ---------- useRouterStore ----------
// export function useRouterStore(): RouterStore {
//     const routerStore = useContext(RouterContext);
//     if (routerStore === undefined) {
//         /* istanbul ignore next */
//         throw new Error(
//             'useRouterStore must be used within a RouterStoreProvider'
//         );
//     }
//     return routerStore;
// }
