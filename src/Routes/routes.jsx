import React from "react";
import { Route } from "react-router";
import Blog from "../Pages/Blog/Blog";

import Gallery from "../Pages/Gallery/Gallery";

import Login from "../Pages/Login/Login";

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={Blog} />
      <Route path="/login" component={Login} />
      <Route path="/gallery" component={Gallery} />
    </div>
  );
};

export default Routes;
