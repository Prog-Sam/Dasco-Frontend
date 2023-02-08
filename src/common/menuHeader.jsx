import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
import SearchBox from './searchBox';

const MenuHeader = ({ path, header, buttonLabel, searchQuery, onSearch }) => {
  return (
    <Fragment>
      <h1 className='d-flex align-items-left'>{header}</h1>
      <div className='d-flex align-items-left'>
        {(getCurrentUser().role == 'Admin') && <Link
          to={`/${path}/New`}
          className='btn btn-primary'
          style={{ marginBottom: 20 }}
        >
          New {buttonLabel}
        </Link>}
      </div>
      <SearchBox value={searchQuery} onChange={onSearch} />
    </Fragment>
  );
};

export default MenuHeader;
