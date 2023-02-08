import React, { useEffect } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../hooks/useForm';
import { getContactType, saveContactType, updateContactType } from '../services/contactTypeService';
import { toast } from 'react-toastify';

const ContactTypeForm = (props) => {
  const localEnums = {};

  const schema = {
    id: Joi.number().label('ID'),
    name: Joi.string().required().min(1).label('Name'),
  };

  useEffect(() => {
    const contactTypeId = props.match.params.id;
    if (contactTypeId === 'New') return;

    async function populateContactType() {
      let { data } = await getContactType(contactTypeId);
      setContactType(data);
    }

    populateContactType();

    if (!contactType) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveContactType(mapToViewModel(contactType))
        : await updateContactType(mapToViewModel(contactType));
      toast(
        `ContactType ${contactType.name} with the id of ${contactType.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/contactTypes');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    contactType,
    setContactType,
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
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} CONTACT TYPE
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderInput('name', 'Name')}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default ContactTypeForm;
