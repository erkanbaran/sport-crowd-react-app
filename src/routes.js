import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/home';
import Layout from './hoc/Layout/layout';
import NewsArticle from './components/Articles/News/Post/index';
import VideoArticle from './components/Articles/Videos/Video/index';
import NewsMain from './components/Articles/News/Main/index';
import VideosMain from './components/Articles/Videos/Main/index';
import Signin from './components/Signin/signin';
import Dashboard from './components/Dashboard/dashboard';
import PrivateRoutes from './components/AuthRoutes/privateRoutes';
import PublicRoutes from './components/AuthRoutes/publicRoutes';

const Routes = (props) => {
    return (
        <Layout user={props.user}>
            <Switch>
                <PublicRoutes {...props} restrictes={false} path="/" exact component={Home}></PublicRoutes>
                <PublicRoutes {...props} restrictes={false} path="/news" exact component={NewsMain}></PublicRoutes>
                <PublicRoutes {...props} restrictes={false} path="/videos" exact component={VideosMain}></PublicRoutes>
                <PublicRoutes {...props} restrictes={false} path="/articles/:id" exact component={NewsArticle}></PublicRoutes>
                <PublicRoutes {...props} restrictes={false} path="/videos/:id" exact component={VideoArticle}></PublicRoutes>
                <PublicRoutes {...props} restrictes={true} path="/sign-in" exact component={Signin}></PublicRoutes>
                <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard}></PrivateRoutes>

            </Switch>
        </Layout>
    );
}

export default Routes;