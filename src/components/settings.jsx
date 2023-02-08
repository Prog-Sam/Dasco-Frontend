import React from 'react';
import { Link } from 'react-router-dom';

const Settings = () => {
  return (
    <div>
      <h1>SETTINGS</h1>
      <ul className='list-group'>
        <li className='list-group-item'>
          <Link to='/products'>PRODUCTS</Link>
        </li>
        <li className='list-group-item'>
          <Link to='/contacts'>CONTACTS</Link>
        </li>
        <li className='list-group-item'>
          <Link to='/contactTypes'>CONTACT TYPES</Link>
        </li>
        <li className='list-group-item'>
          <Link to='/users'>USERS</Link>
        </li>
        <li className='list-group-item'>
          <Link to='/userAccounts'>USER ACCOUNTS</Link>
        </li>
      </ul>
    </div>
  );
};

export default Settings;
