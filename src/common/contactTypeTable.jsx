import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';
import { getCurrentUser } from '../services/authService';

const ContactTypeTable = ({ contactTypes, localEnums, sortColumn, onSort }) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'name',
      content: (contactType) => {
        return (getCurrentUser().role == 'Admin') ?
        <Link to={'/contactTypes/' + contactType.id}>{contactType.name}</Link>
        : contactType.name
      },
      label: 'Name',
    },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={contactTypes}
    />
  );
};

export default ContactTypeTable;
