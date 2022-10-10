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

import { ProductAction } from '../../../../redux/actions/ProductAction';

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

const ProductList = () => {
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
        const response = await dispatch(
          ProductAction.getProducts({
            page,
            rowsPerPage,
            searchQuery: debounceSearchQuery,
          })
        );

        if (response) {
          setRows(response?.products);
          setTotalItems(response?.total);
        }

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
          <Button
            component={Link}
            sx={styles.buttonCreate}
            to='/products/create'
          >
            Create Product
          </Button>
        }
      />

      <FeatureTable
        title='Product List'
        rows={rows}
        rowKey='id'
        isLoading={loading}
        headers={[
          { displayName: 'Name', key: 'name' },
          { displayName: 'SKU', key: 'sku' },
          { displayName: 'Category Name', key: 'categoryName' },
          { displayName: 'price', key: 'price', type: 'rupiah' },
          { displayName: 'Image', key: 'image', type: 'image' },
        ]}
        rowOnClick={(row) => history.push(`/products/${row._id}`)}
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

export default ProductList;
