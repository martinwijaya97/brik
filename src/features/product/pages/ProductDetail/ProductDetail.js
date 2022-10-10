import React, { useEffect, useState } from 'react';
import { useParams, Link as LinkRouter } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import FeatureDetail from '../../../../core/components/FeatureDetail';
import { ProductAction } from '../../../../redux/actions/ProductAction';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const response = await dispatch(ProductAction.getProductDetail({ id }));
      if (!!response) {
        setProduct(response);
      }
    };
    loadData();
  }, [id, dispatch]);

  const renderBreadcrumbs = () => {
    return (
      <Breadcrumbs aria-label='breadcrumb'>
        <Link component={LinkRouter} color='inherit' to='/products'>
          Product
        </Link>
        <Typography color='textPrimary'>{id}</Typography>
      </Breadcrumbs>
    );
  };

  const renderCategoryText = (row) => {
    return (
      <Typography>
        {row?.categoryId}. {row?.categoryName}
      </Typography>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {renderBreadcrumbs()}
      <Box sx={{ flex: 1, marginTop: 2 }}>
        <FeatureDetail
          title='Product Detail'
          row={product}
          headers={[
            { displayName: 'ID', key: '_id' },
            { displayName: 'SKU', key: 'sku' },
            { displayName: 'Name', key: 'name' },
            { displayName: 'Price', key: 'price' },
            { displayName: 'Category', key: 'category' },
            { displayName: 'Description', key: 'description' },
            { displayName: 'Weight', key: 'weight' },
            { displayName: 'Width', key: 'width' },
            { displayName: 'Length', key: 'length' },
            { displayName: 'Height', key: 'height' },
            {
              displayName: 'Image',
              key: 'image',
              type: 'image',
            },
          ]}
          renderFunctions={{
            category: (row) => {
              return renderCategoryText(row);
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ProductDetail;
