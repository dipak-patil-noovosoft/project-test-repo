import * as React from "react";
import {observer} from "mobx-react";
import BasePage from "./BasePage";
import {PageContent} from "../components/shared/Layout";
import {RouterLink} from "mobx-state-router";

@observer
export class DashboardPage extends React.Component {
    // Here you can use your listTableStore or formStore or any other variables 
    // e.g., this.props.page.listTableStore

    render() {
        return (
            <PageContent>
                <div className="mx-auto col">
                    <h3 className={"page-heading"}>Dashboard</h3>
                    <h5 className={"page-heading"}>Hello</h5>
                    <RouterLink routeName={'HomeTest'} params={{message: "hello"}}>Home test</RouterLink>
                </div>
            </PageContent>
        );
    }
}

export class DashboardPageStore extends BasePage {
    component = DashboardPage;
    // Define your store here like formStore or ListTableStore or any observable variable or methods
    // e.g, formStore: FormStore<FormData> = new FormStore(new FormData());
    // listTableStore: ListTableStore<ListItem>;

    load() {
        this.setPageTitle('Dashboard');
    }
}
