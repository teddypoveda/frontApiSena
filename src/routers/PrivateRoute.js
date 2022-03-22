import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    const history = useHistory();

    return (
        <>
            <Route { ...rest }
                component={ (props) => (
                    ( isAuthenticated )
                        ? ( <Component { ...props } /> )
                        : (()=>history.push("/dashboard") )
                )}
            
            />
            
        </>
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
