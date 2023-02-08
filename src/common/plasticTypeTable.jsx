import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';
import DeleteButton from './deleteButton';
import { deletePlasticType } from '../services/plasticTypeService';
import { getCurrentUser } from '../services/authService';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';


const PlasticTypeTable = ({ plasticTypes, localEnums, sortColumn, onSort, setPlasticTypes }) => {
  async function handleDelete(id) {
    try {
      await deletePlasticType(id);
      toast('Product Deleted')
      setPlasticTypes(removeLocalItem(plasticTypes, id))
    } catch (ex) {
      toast.error(ex.message)
    }
  }

  function removeLocalItem(items, id){
    let itemArray = [...items];
    return itemArray.filter(i => i.id != id);
  }

  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'name',
      content: (plasticType) => {
        return (getCurrentUser().role == 'Admin') ?
         <Link to={'/products/' + plasticType.id}>{plasticType.name}</Link> 
         : plasticType.name
      }
      ,
      label: 'Name',
    },
    { path: 'imageLocation', label: 'Image' },
    { path: 'price', label: 'Price' },
    { path: 'qty', label: 'Quantity' },
    {
      key: 'id',
      content: (plasticType) => (
        <div className='row'>
          <div className='col'>
          <Link className='btn btn-primary' to={'/products-image/' + plasticType.id}>{'Open Image'}</Link>
          </div>
          <div className='col'>
          {
            (getCurrentUser().role == 'Admin') &&
            <DeleteButton
            onClick={handleDelete}
            handleDelete={handleDelete}
            value={plasticType.id}
            label={`Product`}
            />
          }
          </div>
        </div>
      ),
      label: 'Actions',
    },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={plasticTypes}
    />
  );
};

export default PlasticTypeTable;
