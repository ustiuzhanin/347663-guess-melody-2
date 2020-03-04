import React from "react";
import {Route, Redirect} from "react-router-dom";
import PropTypes from "prop-types";

export default function withPrivateRoute(props) {
  const {children, isAuthorizationRequired, path, exact} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return !isAuthorizationRequired ? children : <Redirect to="/auth" />;
      }}
    />
  );
}

withPrivateRoute.propTypes = {
  children: PropTypes.object.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired
};
