import React from 'react';
import {DepartmentPage, HomePage, NotFoundPage} from './pages';
import {DashboardPage} from "./pages/DashboardPage";

export const viewMap = {
    department: <DepartmentPage/>,
    home: <HomePage/>,
    notFound: <NotFoundPage/>,
    dashboard: <DashboardPage/>
};