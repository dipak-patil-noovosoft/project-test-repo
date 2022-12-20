import React from 'react';
import BasePage from "./BasePage";

export class NotFoundPage extends React.Component {
    render() {
        return <h1>Page Not Found</h1>;
    }
}

export class NotFoundPageStore extends BasePage {
    component = NotFoundPage;

    load() {
        this.setPageTitle('404');
    }
}