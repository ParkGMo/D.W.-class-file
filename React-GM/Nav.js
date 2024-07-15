import React from 'react';
import Container from './Container';
import { Link } from 'react-router-dom';

function Nav(props) {
  return (
    <div>
      <Container>
        <Link to='/'>
          <div>
            <span>DW</span>
            OS
          </div>
        </Link>
        <ul>
          <li>
            <Link to="about">ABOUT</Link>
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Nav;
