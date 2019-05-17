import React from 'react';
import { Route, Redirect } from 'react-router-dom'

const PrivateRoutes = ({
    user,
    component: Comp,
    ...rest
}) => {
    return (
        <Route {...rest} component={(props) => (
            user ?
                <Comp {...props} user={user}></Comp>
                :
                <Redirect to="/sign-in"></Redirect>
        )}></Route>
    );
};

export default PrivateRoutes;