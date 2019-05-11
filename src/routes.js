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

const Routes = (props) => {
    return (
        <Layout user={props.user}>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/news" exact component={NewsMain}></Route>
                <Route path="/videos" exact component={VideosMain}></Route>
                <Route path="/dashboard" exact component={Dashboard}></Route>
                <Route path="/articles/:id" exact component={NewsArticle}></Route>
                <Route path="/videos/:id" exact component={VideoArticle}></Route>
                <Route path="/sign-in" exact component={Signin}></Route>
            </Switch>
        </Layout>
    );
}

export default Routes;