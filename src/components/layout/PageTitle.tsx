import * as React from 'react';
import { observer } from 'mobx-react';
import Helmet from 'react-helmet';
import {PageStore} from "../../stores/PageStore";


interface IPageTitleProps {
    pageStore: PageStore;
}

@observer
export class PageTitle extends React.Component<IPageTitleProps> {
    public render() {
        const { pageStore } = this.props;

        return (
            <>
                <Helmet defaultTitle={'Rucmin'} titleTemplate={'%s | Rucmin'} />
                <Helmet>
                    <title>{pageStore.pageTitle}</title>
                </Helmet>
            </>
        );
    }
}
