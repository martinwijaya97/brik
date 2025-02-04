/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import useDebounce from '../../../../core/hooks/useDebounce';

import FeatureTable from '../../../../core/components/FeatureTable';
import FeatureHeader from '../../../../core/components/FeatureHeader';
import SearchInput from '../../../../core/components/SearchInput';

import Theme from '../../../../core/theme';
import { COMPANY_LIST } from '../../services/queries';
import useURIState from '../../../../core/hooks/useURIState';
import useSyncUrl from '../../../../core/hooks/useSyncUrl';
import usePaginatedQuery from '../../../../core/hooks/usePaginatedQuery';
import FeatureFilterSidebar from '../../../../core/components/FeatureFilterSidebar';
import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import FeatureFilterSelectForm from '../../../../core/components/FeatureFilterSidebar/components/FeatureFilterSelectForm';

const useStyles = () => {
  const theme = Theme();
  const styles = {
    buttonCreate: {
      paddingX: 2,
      border: 1,
      marginLeft: 4,
      backgroundColor: theme.colors.buttonActive,
      borderColor: theme.colors.buttonActive,
      textTransform: 'none',
      color: theme.colors.textSecondary,
      '&:hover': {
        backgroundColor: theme.colors.buttonDisabled,
      },
    },
  };
  return styles;
};

const CompanyList = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const [searchQuery, setSearchQuery] = useURIState({ name: 'searchQuery' });
  const [page, setPage] = useURIState({
    name: 'page',
    defaultValue: 0,
    isNumber: true,
  });
  const [rowsPerPage, setRowsPerPage] = useURIState({
    name: 'rowsPerPage',
    defaultValue: 10,
    isNumber: true,
  });
  const [sortByDirection, setSortByDirection] = useURIState({
    name: 'sortByDirection',
    defaultValue: 'DESC',
  });
  const [sortByColumnName, setSortByColumnName] = useURIState({
    name: 'sortByColumnName',
    defaultValue: 'id',
  });

  const [filterByStatus, setFilterByStatus] = useURIState({
    name: 'filterByStatus',
  });

  const debounceSearchQuery = useDebounce(searchQuery, 500);

  useSyncUrl({
    searchQuery,
    page,
    rowsPerPage,
    sortByDirection,
    sortByColumnName,
  });

  const { data, loading } = usePaginatedQuery(COMPANY_LIST, {
    page,
    pageSize: rowsPerPage,
    searchQuery: debounceSearchQuery,
    sortByDirection,
    sortByColumnName,
  });

  console.log(sortByDirection, sortByColumnName);

  const loadData = useCallback(() => {
    setRows(data?.companies);
    setTotalItems(data?.meta?.totalItems);
  }, [data]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortFunction = (columnName, direction) => {
    setSortByColumnName(columnName);
    setSortByDirection(direction);
  };

  const clearFilters = () => {
    setPage(0);
    setFilterByStatus(null);
  };

  const renderFilterStatus = () => {
    const list = [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ];

    return (
      <FeatureFilterSelectForm
        label='Filter By Status'
        value={filterByStatus}
        list={list}
        onChange={(event) => {
          setPage(0);
          setFilterByStatus(event.target.value);
        }}
      />
    );
  };

  return (
    <Box>
      <FeatureHeader
        left={
          <SearchInput
            placeholder='Search...'
            value={searchQuery}
            onChange={(event) => {
              setPage(0);
              setSearchQuery(event.target.value);
            }}
          />
        }
        right={
          <>
            <Button component={Link} sx={styles.buttonCreate} to='/companies/create'>
              Create Company
            </Button>
            <FeatureFilterSidebar isFilterActive={!!filterByStatus} onClearFilters={clearFilters}>
              <div>{renderFilterStatus()}</div>
            </FeatureFilterSidebar>
          </>
        }
      />

      <FeatureTable
        title='Company List'
        rows={rows}
        rowKey='number'
        isLoading={loading}
        headers={[
          { displayName: 'ID', key: 'id', sortable: true },
          { displayName: 'Code', key: 'code', sortable: true },
          { displayName: 'Name', key: 'name', sortable: true },
        ]}
        rowOnClick={(row) => navigate(`/companies/${row.id}`)}
        totalItems={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        tablePagination
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
        sortFunction={handleSortFunction}
        sortByDirection={sortByDirection}
        sortByColumnName={sortByColumnName}
      />
    </Box>
  );
};

export default CompanyList;
