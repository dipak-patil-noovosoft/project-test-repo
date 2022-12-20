import React from 'react';
import './App.css';
import {RouterContext} from 'mobx-state-router';
import {observer, Provider} from 'mobx-react';
import {RootStore} from "./stores/RootStore";
import {PageTitle} from './components/layout/PageTitle';
import {RootStoreContext} from "./components/context/AppContext";

interface IAppProps {
    rootStore: RootStore;
}

@observer
class AppContainer extends React.Component<IAppProps> {

    render() {
        const {rootStore} = this.props;
        const page = rootStore.pageStore.currentPage;
        if (!page) {
            return <h1>App container no page</h1>;
        }

        const pageComponent = React.createElement(page.component, {
            page,
            rootStore,
        });
        return (
            <div>
                <PageTitle pageStore={rootStore.pageStore}/>
                {pageComponent}
            </div>
        );
    }

}

export default class App extends React.Component<any, any> {
    render() {
        return (
            <Provider rootStore={this.props.rootStore}>
                <RootStoreContext.Provider value={this.props.rootStore}>
                    <RouterContext.Provider value={this.props.rootStore.routerStore}>
                        <AppContainer rootStore={this.props.rootStore}/>
                    </RouterContext.Provider>
                </RootStoreContext.Provider>
            </Provider>
        );
    }
}