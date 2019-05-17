import React from 'react';
import { Route, Redirect } from 'react-router-dom'

const PublicRoutes = ({
    user,
    component: Comp,
    ...rest
}) => {
    return (
        <Route {...rest} component={(props) => (
            rest.restricted ?
                (
                    user ?
                        <Redirect to="/dashboard"></Redirect>
                        :
                        <Comp {...props} user={user}></Comp>
                )
                :
                <Comp {...props} user={user}></Comp>
        )}></Route>
    );
};

export default PublicRoutes;