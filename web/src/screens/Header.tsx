import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

import './Header.css';

export const Header = () => {
  return (
    <div className="Header">
      <Nav>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/editor/">Editor</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/notes/">Notes</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};
