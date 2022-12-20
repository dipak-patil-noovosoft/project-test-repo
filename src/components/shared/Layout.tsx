import * as React from "react";

export class PageContent extends React.Component<{children:any}> {
    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}
