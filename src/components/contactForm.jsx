import React, { useEffect } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../hooks/useForm';
import { getContact, saveContact, updateContact } from '../services/contactService';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { getUsers } from '../services/userService';
import { getContactTypes } from '../services/contactTypeService';

const ContactForm = (props) => {
    const [users, setUsers] = useState([]);
    const [contactTypes, setContactTypes] = useState([]);
    const localEnums = {};

  const schema = {
    id: Joi.number().label('ID'),
    value: Joi.string().required().min(1).label('Value'),
    userId: Joi.number().required().label('User'),
    contactTypeId: Joi.number().required().label('Contact Type')
  };

  useEffect(() => {

    async function populateUsers() {
        let { data } = await getUsers();
        setUsers(data);
      }
  
      populateUsers();

      async function populateContactTypes() {
        let { data } = await getContactTypes();
        setContactTypes(data);
      }
  
      populateContactTypes();

    const contactId = props.match.params.id;
    if (contactId === 'New') return;

    async function populateContact() {
      let { data } = await getContact(contactId);
      setContact(data);
    }

    populateContact();

    if (!contact) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveContact(mapToViewModel(contact))
        : await updateContact(mapToViewModel(contact));
      toast(
        `Contact ${contact.name} with the id of ${contact.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/contacts');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    contact,
    setContact,
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
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} CONTACT
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderSelect('userId', 'User', _.map(users, (u) => {return {id: u.id, name: `${u.lastName}, ${u.firstName} ${u.middleName}`}}))}
        {renderSelect('contactTypeId', 'Contact Type', contactTypes)}
        {renderInput('value', 'Value')}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default ContactForm;
