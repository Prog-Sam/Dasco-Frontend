import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';
import { getCurrentUser } from '../services/authService';

const UserTable = ({ users, localEnums, sortColumn, onSort }) => {
  
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'lastName',
      content: (user) => {
        return (getCurrentUser().role == 'Admin') ?
        <Link to={'/users/' + user.id}>{user.lastName}</Link>
        : user.lastName
      },
      label: 'Lastname',
    },
    { path: 'firstName', label: 'Firstname' },
    { path: 'middleName', label: 'Middlename' },
    { path: 'position', label: 'Position' },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={users}
    />
  );
};

export default UserTable;
