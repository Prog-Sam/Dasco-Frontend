import React, { useEffect } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../hooks/useForm';
import { getPlasticType, savePlasticType, updatePlasticType } from '../services/plasticTypeService';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Image from '../common/image';

const PlasticTypeForm = (props) => {
  const localEnums = {};
  const [imageLocation, setImageLocation] = useState("");
  const [imageName, setImageName] = useState("");

  const schema = {
    id: Joi.number().label('ID'),
    imageLocation: Joi.string().required().label('Image'),
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
      setImageLocation(data.imageLocation);
      setImageName(data.imageLocation.split(`\\`).pop());
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
    renderColorDaySelector,
    renderFilePicker,
  ] = useForm(schema, doSubmit);

  return (
    <div className='form-control'>
      <h1 className='d-flex align-items-left'>
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} PRODUCT IMAGE
      </h1>
      <div className='form-control row'>
      <Image fileName={imageName}/>
      </div>
      <div className="row">
      <form onSubmit={handleSubmit}>
        {renderFilePicker('imageLocation', 'Picture')}
      </form>
      </div>
      <div className='row'>
  <button className='btn btn-warning' style={{float: 'left'}} onClick={() => props.history.push('/products')}>CLOSE</button>
  </div>
    </div>
  );
};

export default PlasticTypeForm;
