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

function PeopleList({page, nbPages, people, history}) {
  const rows = isEmpty(people) ? map((k) => (
    <PeopleListPlaceholder key={k} />
  ), range(1, 10)) : map((p) => (
    <PeopleListRow key={p.url} {...p} history={history} />
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
      <Pagination
        activePage={page} totalPages={nbPages}
        onPageChange={(evt, {activePage}) => history.push(`/people/${activePage}`)}/>
    </Container>
  );
}

function PeopleListRow({history, url, name, gender, birth_year}) {
  return (
    <Table.Row onClick={() => history.push(`/people/details/${encodeURIComponent(url)}`)}>
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

function PeopleListPlaceholder() {
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
  const ids = pathOr([], ["people","byPages",page], state);
  return {
    nbPages: pathOr(1, ["people", "nbPages"], state),
    page: parseInt(page, 10),
    people: map((id) => pathOr({}, ["people","byIds",id], state), ids),
  };
};

export default withRouter(connect(
  mapStateToProps,
  actions,
)(PeopleList));
