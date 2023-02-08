import React, { useEffect } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../hooks/useForm';
import { getPlasticType, savePlasticType, updatePlasticType } from '../services/plasticTypeService';
import { toast } from 'react-toastify';

const PlasticTypeForm = (props) => {
  const localEnums = {};

  const schema = {
    id: Joi.number().label('ID'),
    name: Joi.string().required().min(1).label('Name'),
    price: Joi.number().required().label('Price'),
    qty: Joi.number().required().label('Stock Qty'),
  };

  useEffect(() => {
    const plasticTypeId = props.match.params.id;
    if (plasticTypeId === 'New') return;

    async function populatePlasticType() {
      let { data } = await getPlasticType(plasticTypeId);
      setPlasticType(data);
    }

    populatePlasticType();

    if (!plasticType) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await savePlasticType(mapToViewModel(plasticType))
        : await updatePlasticType(mapToViewModel(plasticType));
      toast(
        `PlasticType ${plasticType.name} with the id of ${plasticType.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/products');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    plasticType,
    setPlasticType,
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
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} PRODUCT
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderInput('name', 'Name')}
        {renderInput('price', 'Price', 'number')}
        {renderInput('qty', 'Stock Qty', 'number')}
        
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default PlasticTypeForm;
