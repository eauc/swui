import {
  path,
} from "ramda";
import React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Redirect, Route } from "react-router-dom";
import { Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Menu from "./menu";
import store from "../store";
import actions from "../actions";

import PeopleDetails from "./peopleDetails";
import PeopleList from "./peopleList";
import VehiclesDetails from "./vehiclesDetails";
import VehiclesList from "./vehiclesList";

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Segment inverted>
          <Menu />
        </Segment>

        <Route exact path="/" render={() => (
          <Redirect to="/people/1"/>
        )}/>
    <Route exact path="/people/details/:id" render={(props) => {
      const id = decodeURIComponent(path(["match","params","id"], props));
      store.dispatch(actions.peopleLoadVehiclesDetails({id}));
      return <PeopleDetails />;
    }} />
    <Route exact path="/people/:page" render={(props) => {
      const page = decodeURIComponent(path(["match","params","page"], props));
      store.dispatch(actions.peopleLoadPage({page}));
      return <PeopleList />;
    }} />
    <Route exact path="/vehicles/details/:id" render={(props) => {
      const id = decodeURIComponent(path(["match","params","id"], props));
      store.dispatch(actions.vehiclesLoadPilotsDetails({id}));
      return <VehiclesDetails />;
    }} />
    <Route exact path="/vehicles/:page" render={(props) => {
      const page = decodeURIComponent(path(["match","params","page"], props));
      store.dispatch(actions.vehiclesLoadPage({page}));
      return <VehiclesList />;
    }} />
      </div>
    </Router>
  </Provider>
);

export default App;
