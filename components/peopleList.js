import {
  map,
  path,
} from "ramda";
import React from "react";
import { connect } from "react-redux";
import { Container, Table } from "semantic-ui-react";
import actions from "../actions";

function PeopleList({people}) {
  const rows = map((p) => (
    <PeopleListRow key={p.url} {...p} />
  ), people);

  return (
    <Container text>
      <h2>People</h2>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Name
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Header>
          {rows}
        </Table.Header>
      </Table>
    </Container>
  );
}

function PeopleListRow({name}) {
  return (
    <Table.Row>
      <Table.Cell>
        {name}
      </Table.Cell>
    </Table.Row>
  );
}

function mapStateToProps(state) {
  const ids = path(["people","byPages",1], state);
  return {
    people: map((id) => path(["people","byIds",id], state), ids),
  };
};

export default connect(
  mapStateToProps,
  actions,
)(PeopleList);
