import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';
import { getCurrentUser } from '../services/authService';

const UserAccountTable = ({ userAccounts, localEnums, sortColumn, onSort }) => {
    const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'user.id',
      content: (userAccount) => {
        return (getCurrentUser().role == 'Admin') ?
        <Link to={'/userAccounts/' + userAccount.id}>{`${userAccount.user.lastName}, ${userAccount.user.firstName} ${userAccount.user.middleName}`}</Link>
        : `${userAccount.user.lastName}, ${userAccount.user.firstName} ${userAccount.user.middleName}`
      },
      label: 'Name',
    },
    { path: 'username', label: 'Username' },
    { key: 'admin',
    content: (userAccount) => userAccount.admin == true ? `Admin`: `User`,
    label: 'Admin Status', },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={userAccounts}
    />
  );
};

export default UserAccountTable;
