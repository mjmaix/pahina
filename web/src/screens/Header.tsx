import React, { Component } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
} from 'reactstrap';

import './Header.css';
import { handleSignOut } from '../shared';
import { RouteComponentProps, withRouter } from 'react-router';

interface Props extends RouteComponentProps {}
interface State {
  isOpen: boolean;
}

class Header extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const path = this.props.location.pathname;

    return (
      <div className="container">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Pahina</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem active={path === '/'}>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem active={path === '/cases/'}>
                <NavLink href="/cases/">Cases</NavLink>
              </NavItem>
              <NavItem active={path === '/notes/'}>
                <NavLink href="/notes/">Notes</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Account
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Seller pages</DropdownItem>
                  <DropdownItem disabled>
                    Sales report (not yet available)
                  </DropdownItem>
                  <DropdownItem disabled>
                    Payout (not yet available)
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => handleSignOut()}>
                    Sign out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const WithRoute = withRouter(Header);

export { WithRoute as Header };
