import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthLayout } from "./auth";
import { DefaultLayout } from "./default";

export class GlobalLayout extends React.Component {
  public render() {
    return (
      <BrowserRouter basename="/view">
        <Switch>
          <Route path="/auth" exact component={AuthLayout} />
          <Route path="/" component={DefaultLayout} />
        </Switch>
      </BrowserRouter>
    );
  }
}