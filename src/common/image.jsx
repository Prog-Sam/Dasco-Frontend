import React, { useState, useEffect } from 'react';
import { getFile } from '../services/fileService';

const Image = ({ fileName }) => {
    const [imageSrc, setImageSrc] = React.useState(null);
  
    React.useEffect(() => {
      const fetchImage = async () => {
        setImageSrc(await getFile(fileName));
      };
  
      fetchImage();
    }, [fileName]);
  
    return <img src={imageSrc} alt={fileName} style={{
      maxWidth: '800px',
      minWidth: '150px',
      width: '100%',
      height: 'auto',
    }} />
  };
  
  export default Image;