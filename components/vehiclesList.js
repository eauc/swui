import {
  map,
  pathOr,
} from "ramda";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Table } from "semantic-ui-react";
import actions from "../actions";

function VehiclesList({vehicles, history}) {
  const rows = map((p) => (
    <VehiclesListRow key={p.url} {...p} history={history} />
  ), vehicles);

  return (
    <Container text>
      <h2>Vehicles</h2>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell>
              Gender
            </Table.HeaderCell>
            <Table.HeaderCell>
              Birth Year
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body style={{cursor:"pointer"}}>
          {rows}
        </Table.Body>
      </Table>
    </Container>
  );
}

function VehiclesListRow({history, url, name, gender, birth_year}) {
  return (
    <Table.Row onClick={() => history.push(`/vehicles/${encodeURIComponent(url)}`)}>
      <Table.Cell>
        {name}
      </Table.Cell>
      <Table.Cell>
        {gender}
      </Table.Cell>
      <Table.Cell>
        {birth_year}
      </Table.Cell>
    </Table.Row>
  );
}

function mapStateToProps(state) {
  const ids = pathOr([], ["vehicles","byPages",1], state);
  return {
    vehicles: map((id) => pathOr({}, ["vehicles","byIds",id], state), ids),
  };
};

export default withRouter(connect(
  mapStateToProps,
  actions,
)(VehiclesList));
