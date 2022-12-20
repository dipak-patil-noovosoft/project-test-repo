import {RootStore} from "../stores/RootStore";


export default abstract class BasePage {
    public rootStore: RootStore;
    public params: any;
    public queryParams: any;

    constructor(rootStore: RootStore, params: any, queryParams: any) {
        this.rootStore = rootStore;
        this.params = params;
        this.queryParams = queryParams;
    }

    abstract load(): any;

    setPageTitle(title: string) {
        this.rootStore.pageStore.setPageTitle(title);
    }
}
