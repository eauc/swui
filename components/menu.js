import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default withRouter(({location}) => {
  const {pathname} = location;
  return (
  <Menu inverted pointing secondary>
    <Menu.Item as={Link} to="/people/1" active={pathname.startsWith("/people")}>
      People
    </Menu.Item>
    <Menu.Item as={Link} to="/vehicles/1" active={pathname.startsWith("/vehicles")}>
      Vehicles
    </Menu.Item>
  </Menu>
  );
});
