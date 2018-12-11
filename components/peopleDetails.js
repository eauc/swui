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

function PeopleDetails(props) {
  const {
    birth_year,
    eye_color,
    films,
    gender,
    hair_color,
    height,
    mass,
    name,
    skin_color,
    species,
    vehicles,
  } = props;
  const fs = map((url) => (
    <li key={url}>
      {url}
    </li>
  ), films);
  const ss = map((url) => (
    <li key={url}>
      {url}
    </li>
  ), species);
  const vs = map(({url, name}) => (
    <li key={url}>
      <Link to={`/vehicles/details/${encodeURIComponent(url)}`}>
        {name || url}
      </Link>
    </li>
  ), vehicles);
  return (
    <Container text>
      <h2>{name}</h2>
      <p>
        <b>Species:</b>
      </p>
      <ul>
        {ss}
      </ul>
      <p><b>Gender:</b> {gender}</p>
      <p><b>Birth Year:</b> {birth_year}</p>
      <p><b>Height :</b> {height}</p>
      <p><b>Mass :</b> {mass}</p>
      <p><b>Eye color:</b> {eye_color}</p>
      <p><b>Hair color:</b> {hair_color}</p>
      <p><b>Skin color:</b> {skin_color}</p>
      <p>
        <b>Films:</b>
      </p>
      <ul>
        {fs}
      </ul>
      <p>
        <b>Vehicles:</b>
      </p>
      <ul>
        {vs}
      </ul>
    </Container>
  );
}

function mapStateToProps(state, props) {
  const id = decodeURIComponent(path(["match","params","id"], props));
  const people = pathOr({}, ["people","byIds",id], state);
  return {
    ...people,
    vehicles: map((id) => pathOr({
      url: id,
    }, ["vehicles","byIds",id], state), people.vehicles),
  };
};

export default withRouter(connect(
  mapStateToProps,
  actions,
)(PeopleDetails));
