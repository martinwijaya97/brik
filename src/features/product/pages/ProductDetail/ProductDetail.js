import React from 'react';
import { useParams, Link as LinkRouter } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import FeatureDetail from '../../../../core/components/FeatureDetail';
import { ProductAction } from '../../../../redux/actions/ProductAction';

const ProductDetail = () => {
  const { id } = useParams();

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
          row={{
            id: 86,
            categoryId: 14,
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
          }}
          headers={[
            { displayName: 'ID', key: 'id' },
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
