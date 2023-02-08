import React, { Fragment, useState } from 'react';
import { saveFile, deleteFile } from '../services/fileService';
import { toast } from 'react-toastify';
import { getCurrentUser } from '../services/authService';

const FilePicker = ({ name, label, error, value, handleUpload, modelId,...rest }) => {
  const [driveUrl, setDriveUrl] = useState('https://drive.google.com/file/d/');
  const [file, setFile] = useState(null);
  const [currentValue, setCurrentValue] = useState('');

  const urlAppender = (url) => {
    let localValue = url;
    // setCurrentValue(localValue);

    handleUpload(localValue, name);
  };

  const handleSubmit = async () => {
    if (file) {
      try {
        toast('Uploading File...');
        const formData = new FormData();
        formData.append('file', file.data);
        const res = await saveFile(formData, modelId);
        setFile(null);
        console.log(res);
        urlAppender(res.data);
        toast('File Uploaded Successfully');
      } catch (ex) {
        console.log(ex);
        toast.error(ex.message);
      }
      return;
    }
    toast.error('No file selected');
  };

  const handleDelete = async () => {
    if(value == '')
      {
        toast.error('No File to delete');
      }
    try{
      const res = await deleteFile(value);
      handleUpload('', name)
    }
    catch(ex){
      toast.error(ex.message);
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const localFile = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      };
      setFile(localFile);
      console.log('hasFile');
      return;
    }
    console.log('no file');
    setFile(null);
  };

  return (
    <Fragment>
      <div className='form-group'>
        <div>
          <label className='d-flex align-items-left' htmlFor={name}>
            {label}
          </label>
        </div>
        <div>
          <input
            {...rest}
            id={`fileUpload`}
            name={`fileUpload`}
            type='file'
            onChange={handleFileChange}
            className='form-control d-flex align-items-left'
          />
        </div>
        <div>
          {
            (getCurrentUser().role == 'Admin') &&
          <button
            type='button'
            className='btn btn-primary d-flex align-items-left'
            name={name}
            onClick={handleSubmit}
          >
            Upload Image
          </button>
          }
        </div>
        {/* <div>
          <button
            type='button'
            className='btn btn-danger d-flex align-items-left'
            name={name}
            onClick={handleDelete}
          >
            Remove Current Image
          </button>
        </div> */}
        <div>
          <h6 className='d-flex align-items-left' name={name}>
            Path: {value}
          </h6>
        </div>
        {error && <div className='alert alert-danger'>{error}</div>}
      </div>
    </Fragment>
  );
};

export default FilePicker;