/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import FeatureTable from '../../../../core/components/FeatureTable';
import FeatureHeader from '../../../../core/components/FeatureHeader';
import SearchInput from '../../../../core/components/SearchInput';

import useDebounce from '../../../../core/hooks/useDebounce';

import { ProductAction } from '../../../../redux/actions/ProductAction';

const ProductList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const debounceSearchQuery = useDebounce(searchQuery, 500);

  const products = useSelector((props) => props.product.products);

  const loadData = useCallback(() => {
    setLoading(true);
    const loadData = async () => {
      try {
        // const asd = await dispatch(ProductAction.getProducts());
        // const asds = await dispatch(ProductAction.createProduct());
        // console.log('GILA', asd);
        // console.log('GILA 1', asds);
        const response = await dispatch(
          ProductAction.productList({
            page,
            pageSize: rowsPerPage,
            search: debounceSearchQuery,
          })
        );

        if (response) {
          setRows(response.products);
          setTotalItems(response.meta.total);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box div>
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
            style={{
              color: 'black',
              border: '1px solid #00A3FF',
            }}
            to='/products/create'
          >
            Add New
          </Button>
        }
      />

      <Box div>
        <FeatureTable
          title='Product List'
          rows={[
            {
              id: 86,
              CategoryId: 14,
              categoryName: 'Cemilan',
              sku: 'MHZVTK',
              name: 'Ciki ciki',
              description:
                'Ciki ciki yang super enak, hanya di toko klontong kami',
              weight: 500,
              width: 5,
              length: 5,
              height: 5,
              image:
                'https://cf.shopee.co.id/file/7cb930d1bd183a435f4fb3e5cc4a896b',
              price: 30000,
            },
            {
              id: 86,
              CategoryId: 14,
              categoryName: 'Cemilan',
              sku: 'MHZVTK',
              name: 'Ciki ciki',
              description:
                'Ciki ciki yang super enak, hanya di toko klontong kami',
              weight: 500,
              width: 5,
              length: 5,
              height: 5,
              image:
                'https://cf.shopee.co.id/file/7cb930d1bd183a435f4fb3e5cc4a896b',
              price: 30000,
            },
          ]}
          rowKey='id'
          isLoading={loading}
          headers={[
            { displayName: 'Name', key: 'name' },
            { displayName: 'SKU', key: 'sku' },
            { displayName: 'Category Name', key: 'categoryName' },
            { displayName: 'price', key: 'price', type: 'rupiah' },
            { displayName: 'Image', key: 'image', type: 'image' },
          ]}
          rowOnClick={(row) => history.push(`/products/${row.id}`)}
          totalItems={totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          tablePagination
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default ProductList;
