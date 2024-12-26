/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import useDebounce from '../../../../core/hooks/useDebounce';

import FeatureTable from '../../../../core/components/FeatureTable';
import FeatureHeader from '../../../../core/components/FeatureHeader';
import SearchInput from '../../../../core/components/SearchInput';

// import useDebounce from '../../../../core/hooks/useDebounce';

// import { CompanyAction } from '../../../../redux/actions/CompanyAction';

import Theme from '../../../../core/theme';

const useStyles = () => {
  const theme = Theme();
  const styles = {
    buttonCreate: {
      paddingX: 2,
      border: 1,
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

const companyList = [
  {
    company_code: '1720',
    company_name: 'CPI - Cikande',
    created_by: 'agus',
    created_at: '2024-12-02',
    updated_by: '',
    updated_at: '',
  },
  {
    company_code: '1840',
    company_name: 'CPI - Berbek',
    created_by: 'agus',
    created_at: '2024-12-02',
    updated_by: '',
    updated_at: '',
  },
  {
    company_code: '1880',
    company_name: 'CPI - Salatiga',
    created_by: 'agus',
    created_at: '2024-12-02',
    updated_by: '',
    updated_at: '',
  },
];

const CompanyList = () => {
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const debounceSearchQuery = useDebounce(searchQuery, 500);

  const loadData = useCallback(() => {
    setLoading(true);
    const loadData = async () => {
      try {
        // const response = await dispatch(
        //   CompanyAction.getCompanies({
        //     page,
        //     rowsPerPage,
        //     searchQuery: debounceSearchQuery,
        //   })
        // );

        // if (response) {
        setRows(companyList);
        setTotalItems(companyList.length);
        // }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    loadData();
  }, [dispatch, page, rowsPerPage, debounceSearchQuery]);

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
          <Button component={Link} sx={styles.buttonCreate} to='/machines/create'>
            Create Company
          </Button>
        }
      />

      <FeatureTable
        title='Company List'
        rows={rows}
        rowKey='id'
        isLoading={loading}
        headers={[
          { displayName: 'Id', key: 'id' },
          { displayName: 'Code', key: 'company_code' },
          { displayName: 'Name', key: 'company_name' },
        ]}
        rowOnClick={(row) => history.push(`/machines/${row.machine_id}`)}
        renderFunctions={{
          id: (row, index) => {
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
