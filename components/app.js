import {
  path,
} from "ramda";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Menu from "./menu";
import store from "../store";
import {
  peopleLoadPage,
  peopleLoadVehiclesDetails,
  vehiclesLoadPage,
} from "../actions";
import PeopleDetails from "./peopleDetails";
import PeopleList from "./peopleList";
import VehiclesList from "./vehiclesList";

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Segment inverted>
          <Menu />
        </Segment>

        <Route exact path="/" render={() => (
          <Redirect to="/people"/>
        )}/>
    <Route exact path="/people/" render={() => {
      store.dispatch(peopleLoadPage());
      return <PeopleList />;
    }} />
    <Route exact path="/people/:id" render={(props) => {
      const id = decodeURIComponent(path(["match","params","id"], props));
      store.dispatch(peopleLoadVehiclesDetails({id}));
      return <PeopleDetails />;
    }} />
    <Route exact path="/vehicles/" render={() => {
      store.dispatch(vehiclesLoadPage());
      return <VehiclesList />;
    }} />
      </div>
    </Router>
  </Provider>
);

export default App;
