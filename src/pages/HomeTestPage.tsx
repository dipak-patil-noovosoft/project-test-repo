import * as React from "react";
import BasePage from "./BasePage";
import {PageContent} from "../components/shared/Layout";

export class HomeTestPage extends React.Component<any, any> {

    handleClick = () => {
        this.props.rootStore.routerStore.goTo('Details', {
            params: {id: 'electronics'},
        });
    };

    render() {
        return (
            <PageContent>
                <div className="mx-auto col">
                    <h3 className={"page-heading"}>This is home test page</h3>
                    <button onClick={this.handleClick}>Go to Electronics</button>
                </div>
            </PageContent>
        );
    }
}

export class HomeTestPageStore extends BasePage {
    component = HomeTestPage;

    load() {
        this.setPageTitle('Home Test Page');
    }
}
