export interface IInitialState {
    session: {
        user: any,
    };
    csrf_token: string;
}

export interface IWindow extends Window {
    siteAddress: string;
    initialState: IInitialState;
    onunhandledrejection: any;
}
