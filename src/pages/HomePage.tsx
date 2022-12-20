import React from 'react';
import {RouterLink, useRouterStore} from 'mobx-state-router';

export const HomePage = (props: any) => {
    const routerStore = useRouterStore();

    const handleClick = () => {
        routerStore.goTo('department', {
            params: {id: 'electronics'},
        });
    };

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleClick}>Go to Electronics</button>
            <br/>
            <RouterLink routeName={'department'} params={{id: 'phones'}}>Electronics link</RouterLink>
        </div>
    );
};