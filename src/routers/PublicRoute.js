import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';
import { NavBarUser } from './NavBarUser';
import {useHistory} from 'react-router-dom'


export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    const history = useHistory();
    return (
        
        <Route { ...rest }
            component={ (props) => ( isAuthenticated )
                    ? ( ()=>history.push("/inasistencias") )
                    : ( <Component { ...props } /> )                    
             }
        
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
