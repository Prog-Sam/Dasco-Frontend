import { useState, useEffect } from 'react';
import Input from './../common/input';
import Select from '../common/select';
import _ from 'lodash';
import Joi from 'joi-browser';

const useForm = (
  schema,
  submitCallback,
  itemInDb = {},
  subscriberSchema = {}
) => {
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    setSubscribers(subscriberSchema);
    if (itemInDb) {
      setState({ ...itemInDb });
      return;
    }
    setState({});
  }, []);

  const getSelectOptions = (options) => {
    return options.map((opt) => ({
      label: opt.name || opt.type || opt.colorName || opt.modelName,
      value: opt.id,
    }));
  };

  const getSelectedOption = (id, options) => {
    const item = _.find(options, { id });
    return { label: item.name || item.type, label: item.id };
  };

  const checkSubscribers = (name, value, pendingState) => {
    let localState = { ...pendingState };
    console.log(localState);
    for (const subscriber of subscribers) {
      subscriber.keys[name] = value || '';
      subscriber.value = subscriber.getValue(subscriber.keys);
      localState[subscriber.path] = subscriber.value;
    }
    setState({ ...pendingState, ...localState });
    // console.log({ ...localState });
    // console.log({ ...state });
  };

  const mapToViewModel = (data) => {
    let paths = Object.keys(schema);
    return _.pick(data, [...paths]);
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(mapToViewModel(state), schema, options);
    if (!error) return null;

    const localErrors = {};
    for (let item of error.details) localErrors[item.path[0]] = item.message;

    return localErrors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const localSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, localSchema);

    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    submitCallback();
  };

  const handleChange = (e) => {
    e.persist();
    setState({ ...state, [e.target.name]: e.target.value });

    const localErrors = { ...errors };
    const errorMessage = validateProperty(e.target);
    if (errorMessage) localErrors[e.target.name] = errorMessage;
    else delete localErrors[e.target.name];

    setErrors(localErrors);
  };

  const handleSelectChange = ({ value, label }, { name }) => {
    let pendingState = {
      ...state,
      [name]: value,
      ['objectVal-' + name]: { label, value },
    };
    console.log(state);
    checkSubscribers(name, label, pendingState);

    const localErrors = { ...errors };
    const errorMessage = validateProperty({ value, name });
    if (errorMessage) localErrors[name] = errorMessage;
    else delete localErrors[name];

    setErrors(localErrors);
  };

  const renderButton = (label) => {
    return (
      <button
        disabled={validate()}
        className='btn btn-primary d-flex align-items-left'
      >
        {label}
      </button>
    );
  };

  const renderInput = (name, label, type = 'text', readOnly = false) => {
    return (
      <Input
        name={name}
        label={label}
        onChange={handleChange}
        value={state[name] || ''}
        type={type}
        readOnly={readOnly}
        error={errors[name]}
      />
    );
  };

  const renderLabel = (name, label) => {
    return (
      <h4 className='d-flex align-items-left'>
        {name}: {label}
      </h4>
    );
  };

  const renderSelect = (name, label, options, isDisabled = false) => {
    return (
      <Select
        name={name}
        label={label}
        options={getSelectOptions(options)}
        isDisabled={isDisabled}
        error={errors[name]}
        value={getSelectOptions(options).filter(
          (option) => option.value === state[name]
        )}
        onChange={handleSelectChange}
      />
    );
  };

  return [
    state,
    setState,
    handleSubmit,
    renderButton,
    renderInput,
    renderLabel,
    renderSelect,
    mapToViewModel,
    getSelectedOption,
  ];
};

export default useForm;
