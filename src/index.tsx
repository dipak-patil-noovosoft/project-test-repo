import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {RootStore} from "./stores/RootStore";
import {routes} from "./routes";
import {IWindow} from "./utils/interfaces";
import {browserHistory, HistoryAdapter} from "mobx-state-router";
import App from "./App";

const rootStore = new RootStore(routes, (window as unknown as IWindow).initialState);
const historyAdapter = new HistoryAdapter(rootStore.routerStore, browserHistory);
historyAdapter.observeRouterStateChanges();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <App rootStore={rootStore}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
