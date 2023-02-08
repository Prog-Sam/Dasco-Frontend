import React, { useEffect, useState } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../hooks/useForm';
import { getCurrentUser } from '../services/authService';
import { getUserAccount, saveUserAccount, updateUserAccount } from './../services/userAccountService';
import { getUsers } from '../services/userService';
import { toast } from 'react-toastify';

const UserAccountForm = (props) => {
    const [users, setUsers] = useState([]);

  const localEnums = {
    status: [
      { id: 0, name: 'TEMPORARY' },
      { id: 1, name: 'ACTIVE' },
      { id: 2, name: 'DISABLED' },
    ],
    access: [
      { id: '0', name: 'DEVELOPER' },
      { id: '1', name: 'OIC' },
      { id: '2', name: 'ASSISTANT OIC' },
      { id: '3', name: 'MANAGEMENT' },
      { id: '4', name: 'OPTOMETRIST' },
      { id: '5', name: 'ENCODER' },
      { id: '6', name: 'SALES' },
    ],
  };

  const schema = {
    id: Joi.number().label('ID'),
    username: Joi.string().required().min(2).label('Username'),
    password: Joi.string().required().label('Password'),
    admin: Joi.boolean().required().label('Admin Status'),
    userId: Joi.number().required().label('UserId'),
    // accessorId: Joi.number().required().label('accessorId'),
  }

  useEffect(() => {
    async function populateUsers() {
        let { data } = await getUsers();
        setUsers(data);
      }
      populateUsers();

    const userAccountId = props.match.params.id;
    if (userAccountId === 'New') return;

    async function populateUserAccount() {
      let { data } = await getUserAccount(userAccountId);
      setUserAccount(data);
    }
    populateUserAccount();

    if (!userAccount) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveUserAccount(mapToViewModel(userAccount))
        : await updateUserAccount(mapToViewModel(userAccount));
      toast(
        `UserAccount ${userAccount.name} with the id of ${userAccount.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/userAccounts');
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
  };

  const [
    userAccount,
    setUserAccount,
    handleSubmit,
    renderButton,
    renderInput,
    renderLabel,
    renderSelect,
    mapToViewModel,
    getSelectedOption,
  ] = useForm(schema, doSubmit);

  return (
    <div>
      <h1 className='d-flex align-items-left'>
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} USER ACCOUNT
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderInput('username', 'Username')}
        {props.match.params.id === 'New' && renderInput('password', 'Password', 'password')}
        {renderSelect('admin', 'Admin Status',[{id:true, name: 'Admin'}, {id:false, name: 'User'}])}
        {renderSelect('userId', 'User', _.map(users, (u) => {return {id: u.id, name: `${u.lastName}, ${u.firstName} ${u.middleName}`}}))}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default UserAccountForm;
