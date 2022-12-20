import * as React from "react";
import {observer} from "mobx-react";
import BasePage from "./BasePage";
import {PageContent} from "../components/shared/Layout";

class DetailsPage extends React.Component {

    render() {
        return (
            <PageContent>
                <div className="mx-auto col">
                    <h3 className={"page-heading"}>This is Details page</h3>
                </div>
            </PageContent>
        );
    }
}

export class DetailsPageStore extends BasePage {
    component = DetailsPage;

    load() {
        this.setPageTitle('Details Page');
    }
}
