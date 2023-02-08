import React, { Fragment } from 'react';
import RSelect from 'react-select';

const DeleteButton = ({
  name,
  onClick,
  handleDelete,
  value,
  label,
  ...rest
}) => {

  function handleClick(value){
    handleDelete(value);
  }
  
  return (
    <div>
        <button name={name} type='button' className='btn btn-danger' onClick={() => handleClick(value)}>
        Delete {label}
        </button>
    </div>
  );
};

export default DeleteButton;
