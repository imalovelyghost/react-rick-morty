import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import * as routes from "./constants/routes";
import Episode from "./pages/Episode"


function App() {
  return (

<Switch>
<Route
    path={`${routes.EPISODE}/:episodeId`}
    render={(routeProps)=>(<Episode {...routeProps} />)}
  />
  <Route
    path={routes.HOME}
    render={(routeProps)=>(<Home {...routeProps} />)}
  />

  </Switch>
  )}
export default App;
