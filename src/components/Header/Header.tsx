import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

const Header = () => (
  <header>
    <Link to="/">Home</Link>
    <Link to="/news">News</Link>
    <Link to="/redux">Redux Component</Link>
    <Link to="/axios">Request with Axios</Link>
    <Link to="/formik">Forms with Formik</Link>
  </header>
);

export default Header;
