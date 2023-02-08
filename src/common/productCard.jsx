import React from 'react';
import Image from './image';

const ProductCard = ({ product }) => {
  return (
    <div style={{ 
      display: 'inline-block', 
      width: '300px', 
      margin: '16px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '16px'
    }}>
      <Image fileName={product.imageLocation.split('\\').pop()} style={{ width: '100%' }} />
      <h2>{product.name}</h2>
      <p>Price: ₱{product.price}</p>
      <p>Quantity: {product.qty}</p>
    </div>
  );
};

export default ProductCard;