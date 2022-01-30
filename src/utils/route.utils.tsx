import React from "react";
import { Route } from "react-router-dom";

export function RouteNavigator(route: any) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => (
        <route.component {...props} isAdmin={route?.isAdmin} />
      )}
    />
  );
}