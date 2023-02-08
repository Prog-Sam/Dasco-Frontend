import React from 'react';
import CardGrid from '../common/cardGrid';
import { getPlasticTypes } from '../services/plasticTypeService';
import { useState } from 'react';
import { useEffect } from 'react';

const PlasticTypeView = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function populateProducts(){
            const {data} = await getPlasticTypes();
            setProducts(data)
        }

        populateProducts();
    }, {})
    

  return (
    <div>
      <h1>PRODUCTS</h1>
      <CardGrid products={products} />
    </div>
  );
};

export default PlasticTypeView;
