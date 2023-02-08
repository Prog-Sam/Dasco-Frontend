import React from 'react';
import { useState, useEffect } from 'react';
import { getPlasticTypes } from '../services/plasticTypeService';
import Pagination from './../common/pagination';
import { paginate } from '../utils/paginate';
import PlasticTypeTable from '../common/plasticTypeTable';
import MenuHeader from '../common/menuHeader';
import _ from 'lodash';

const PlasticType = () => {
  const [plasticTypes, setPlasticTypes] = useState([]);
  const [pageSize, setPageSize] = useState(25);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({});
  const [localEnums, setLocalEnums] = useState({
    status: [
      { id: 0, value: 'TEMPORARY' },
      { id: 1, value: 'ACTIVE' },
    ],
    access: [
      { id: '0', value: 'DEVELOPER' },
      { id: '1', value: 'OIC' },
      { id: '2', value: 'ASSISTANT OIC' },
      { id: '3', value: 'MANAGEMENT' },
      { id: '4', value: 'OPTOMETRIST' },
      { id: '5', value: 'ENCODER' },
      { id: '6', value: 'SALES' },
    ],
  });

  useEffect(() => {
    handlePageChange(0);

    async function getData() {
      const { data } = await getPlasticTypes();
      setPlasticTypes(data);
    }

    getData();
  }, []);

  const handlePageChange = (i) => {
    setCurrentPage(i + 1);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const getPagedData = () => {
    let filtered = plasticTypes;
    if (searchQuery)
      filtered = plasticTypes.filter((u) =>
        u.name.toLowerCase().startsWith(searchQuery.toLocaleLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const paginated = paginate(sorted, currentPage, pageSize);
    return { paginated, filtered };
  };

  return (
    <div className='row'>
      {/* <div className='col-2'><ListGroup items={ }/></div> */}
      <div className='col'>
        <MenuHeader
          path='products'
          header={'PRODUCTS'}
          buttonLabel='Product'
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />
        <PlasticTypeTable
          plasticTypes={getPagedData().paginated}
          localEnums={localEnums}
          onSort={handleSort}
          sortColumn={sortColumn}
          setPlasticTypes={setPlasticTypes}
        />
        <Pagination
          totalItems={getPagedData().filtered.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default PlasticType;
