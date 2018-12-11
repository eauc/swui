import {
  map,
  path,
  pathOr,
} from "ramda";
import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
import actions from "../actions";

function VehiclesDetails(props) {
  const {
    cargo_capacity,
    consumables,
    cost_in_credits,
    crew,
    films,
    length,
    manufacturer,
    max_atmosphering_speed,
    model,
    name,
    passengers,
    pilots,
    vehicle_class,
  } = props;
  const fs = map((url) => (
    <li key={url}>
      {url}
    </li>
  ), films);
  const ps = map(({url, name}) => (
    <li key={url}>
      <Link to={`/people/details/${encodeURIComponent(url)}`}>
        {name || url}
      </Link>
    </li>
  ), pilots);
  return (
    <Container text>
      <h2>{name}</h2>
      <p><b>Model:</b> {model}</p>
      <p><b>Manufacturer:</b> {manufacturer}</p>
      <p><b>Class:</b> {vehicle_class}</p>
      <p><b>Length:</b> {length} m</p>
      <p><b>Max Atmo. Speed:</b> {max_atmosphering_speed} km/h</p>
      <p><b>Capacity:</b> {crew} crew / {passengers} passengers / {cargo_capacity} kg cargo</p>
      <p><b>Consumables:</b> {consumables}</p>
      <p><b>Cost:</b> {cost_in_credits} Cr.</p>
      <p>
        <b>Pilots:</b>
      </p>
      <ul>
        {ps}
      </ul>
      <p>
        <b>Films:</b>
      </p>
      <ul>
        {fs}
      </ul>
    </Container>
  );
}

function mapStateToProps(state, props) {
  const id = decodeURIComponent(path(["match","params","id"], props));
  const vehicles = pathOr({}, ["vehicles","byIds",id], state);
  return {
    ...vehicles,
    pilots: map((id) => pathOr({
      url: id,
    }, ["people","byIds",id], state), vehicles.pilots),
  };
};

export default withRouter(connect(
  mapStateToProps,
  actions,
)(VehiclesDetails));
