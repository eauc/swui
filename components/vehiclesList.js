import {
  isEmpty,
  map,
  pathOr,
  range,
} from "ramda";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Pagination, Table } from "semantic-ui-react";
import actions from "../actions";

function VehiclesList({page, nbPages, vehicles, history}) {
  const rows = isEmpty(vehicles) ? map((k) => (
    <VehiclesListPlaceholder key={k} />
  ), range(1, 10)) : map((p) => (
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
              Class
            </Table.HeaderCell>
            <Table.HeaderCell>
              Manufacturer
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body style={{cursor:"pointer"}}>
          {rows}
        </Table.Body>
      </Table>
      <Pagination
        activePage={page} totalPages={nbPages}
        onPageChange={(evt, {activePage}) => history.push(`/vehicles/${activePage}`)}/>
    </Container>
  );
}

function VehiclesListRow({history, url, name, manufacturer, vehicle_class}) {
  return (
    <Table.Row onClick={() => history.push(`/vehicles/details/${encodeURIComponent(url)}`)}>
      <Table.Cell>
        {name}
      </Table.Cell>
      <Table.Cell>
        {vehicle_class}
      </Table.Cell>
      <Table.Cell>
        {manufacturer}
      </Table.Cell>
    </Table.Row>
  );
}

function VehiclesListPlaceholder() {
  return (
    <Table.Row>
      <Table.Cell colSpan="3"
                  textAlign="center">
        Loading...
      </Table.Cell>
    </Table.Row>
  );
}

function mapStateToProps(state, props) {
  const page = pathOr("1", ["match","params","page"], props);
  const ids = pathOr([], ["vehicles","byPages",page], state);
  return {
    nbPages: pathOr(1, ["vehicles","nbPages"], state),
    page: parseInt(page, 10),
    vehicles: map((id) => pathOr({}, ["vehicles","byIds",id], state), ids),
  };
};

export default withRouter(connect(
  mapStateToProps,
  actions,
)(VehiclesList));
