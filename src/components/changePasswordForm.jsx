import React, { useContext } from 'react';
import Joi from 'joi-browser';
import useForm from './../hooks/useForm';
import { changePass, getCurrentUser, login } from '../services/authService';
import { toast } from 'react-toastify';
import UserContext from './../context/userContext';
import { Redirect } from 'react-router-dom';

const ChangePasswordForm = (props) => {
  const schema = {
    oldPassword: Joi.string().required().label('Old Password'),
    newPassword: Joi.string().required().label('New Password'),
    verification: Joi.string().required().label('Retype Password'),
  };

  const userContext = useContext(UserContext);

  const doSubmit = async () => {
    try {
      if(values.newPassword != values.verification)
      {
        toast.error('Passwords Does not match.');
        return
      }
      console.log('Submit Called');
      const { data } = await changePass(values);

      const { state } = props.location;
      window.location = state ? state.from.pathname : '/';

      toast(data);
    } catch (ex) {
      console.log(ex);
      toast.error(ex.response.data.message);
    }
  };

  const [values, setValues, handleSubmit, renderButton, renderInput] = useForm(
    schema,
    doSubmit
  );

  return (
    <div>
      {!getCurrentUser() && <Redirect to='/login' />}
      <h1>CHANGE PASSWORD</h1>
      <form onSubmit={handleSubmit}>
        {renderInput('oldPassword', 'Old Password', 'password')}
        {renderInput('newPassword', 'New Password', 'password')}
        {renderInput('verification', 'Retype Pssword', 'password')}
        {renderButton('Change Password')}
      </form>
    </div>
  );
};

export default ChangePasswordForm;
