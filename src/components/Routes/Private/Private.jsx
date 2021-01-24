import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../Store/provider'

const RoutesPrivate = ({ component: Component, ...rest}) => {    
    const { token } = useAuth();
    const contex = useAuth();
    console.log('context ', contex)
    return (
        <Route
          {...rest}
          render={() => token
            ? <Component {...rest} />
            : <Redirect to="/login" />
          }
        />
      )
}
export default RoutesPrivate

