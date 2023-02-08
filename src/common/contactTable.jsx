import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';
import { getCurrentUser } from '../services/authService';

const ContactTable = ({ contacts, localEnums, sortColumn, onSort }) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
        key: 'user.id',
        content: (contact) => {
          return (getCurrentUser().role == 'Admin') ?
          <Link to={'/contacts/' + contact.id}>{`${contact.user.lastName}, ${contact.user.firstName} ${contact.user.middleName}`}</Link>
          : `${contact.user.lastName}, ${contact.user.firstName} ${contact.user.middleName}`
        },
        label: 'Name',
    },
    { path: 'contactType.name', label: 'Contact Type' },
    { path: 'value', label: 'Value' },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={contacts}
    />
  );
};

export default ContactTable;
