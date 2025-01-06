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
import { useQuery } from '@apollo/client';
import { COMPANY_LIST } from '../../services/queries';

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const debounceSearchQuery = useDebounce(searchQuery, 500);

  const { data, loading } = useQuery(COMPANY_LIST, {
    variables: {
      page,
      pageSize: rowsPerPage,
      searchQuery: debounceSearchQuery,
      // sortByDirection,
      // sortByColumnName,
    },
  });

  const loadData = useCallback(() => {
    const loadData = async () => {
      setRows(data?.companyList?.companies);
      setTotalItems(data?.companyList?.meta?.totalItems);
    };

    loadData();
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
          <Button component={Link} sx={styles.buttonCreate} to='/companies/create'>
            Create Company
          </Button>
        }
      />

      <FeatureTable
        title='Company List'
        rows={data?.companyList?.companies}
        rowKey='number'
        isLoading={loading}
        headers={[
          { displayName: 'No', key: 'number' },
          { displayName: 'Code', key: 'code' },
          { displayName: 'Name', key: 'name' },
        ]}
        rowOnClick={(row) => navigate(`/companies/${row.id}`)}
        renderFunctions={{
          number: (row, index) => {
            return index + 1;
          },
        }}
        totalItems={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        tablePagination
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </Box>
  );
};

export default CompanyList;
