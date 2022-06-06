import React from 'react';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { getLensParams } from '../services/lensParamService';
import Pagination from './../common/pagination';
import { paginate } from '../utils/paginate';
import LensParamTable from '../common/lensParamTable';
import MenuHeader from '../common/menuHeader';

const LensParam = () => {
  const [lensParams, setLensParams] = useState([]);
  const [pageSize, setPageSize] = useState(25);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({});
  const [localEnums, setLocalEnums] = useState({
    status: [
      { id: 0, value: 'TEMPORARY' },
      { id: 1, value: 'ACTIVE' },
      { id: 2, value: 'DISABLED' },
    ],
  });

  useEffect(() => {
    handlePageChange(0);

    async function getData() {
      const { data } = await getLensParams();
      setLensParams(data);
    }

    getData();
  }, []);

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handlePageChange = (i) => {
    setCurrentPage(i + 1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const getPagedData = () => {
    let filtered = lensParams;
    if (searchQuery)
      filtered = lensParams.filter((u) =>
        u.LensItem.name
          .toLowerCase()
          .startsWith(searchQuery.toLocaleLowerCase())
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
          path='lensParams'
          header={'LENS PARAMETERS'}
          buttonLabel='Lens Parameter'
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />
        <LensParamTable
          lensParams={getPagedData().paginated}
          localEnums={localEnums}
          onSort={handleSort}
          sortColumn={sortColumn}
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

export default LensParam;
