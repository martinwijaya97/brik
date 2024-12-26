import React, { useEffect, useState } from 'react';
import { useParams, Link as LinkRouter } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import FeatureDetail from '../../../../core/components/FeatureDetail';
// import { CompanyAction } from '../../../../redux/actions/CompanyAction';

const data = [
  {
    machine_id: 1,
    machine_code: 'M1',
    machine_name: 'AHE-192 (M1)',
    machine_type: 'AHE-192',
    sub_instrument_code: 'CMP',
  },
  {
    machine_id: 2,
    machine_code: 'M2',
    machine_name: 'GTE-394 (M2)',
    machine_type: 'GTE-394',
    sub_instrument_code: 'CMP',
  },
  {
    machine_id: 3,
    machine_code: 'M3',
    machine_name: 'YFV-738 (M3)',
    machine_type: 'YFV-738',
    sub_instrument_code: 'CMP',
  },
];

const CompanyDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [machine, setCompany] = useState({});

  useEffect(() => {
    const loadData = async () => {
      // const response = await dispatch(CompanyAction.getCompanyDetail({ id }));
      const response = data.find((row) => row.machine_id === id);

      console.log('MARITN', data);

      if (!!response) {
        setCompany(response);
      }
    };
    loadData();
  }, [id, dispatch]);

  const renderBreadcrumbs = () => {
    return (
      <Breadcrumbs aria-label='breadcrumb'>
        <Link component={LinkRouter} color='inherit' to='/machines'>
          Company
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
          title='Company Detail'
          row={machine}
          headers={[
            { displayName: 'ID', key: 'machine_id' },
            { displayName: 'Name', key: 'machine_name' },
            { displayName: 'Type', key: 'machine_type' },
            { displayName: 'sub_instrument', key: 'sub_instrument_code' },
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

export default CompanyDetail;
