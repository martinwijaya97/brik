import React from 'react';
import { useParams, Link as LinkRouter, useNavigate } from 'react-router-dom';
import { List as ReactContentLoaderList } from 'react-content-loader';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import FeatureDetail from '../../../../core/components/FeatureDetail';
import { useQuery } from '@apollo/client';
import { COMPANY_DETAIL } from '../../services/queries';
import { Button } from '@mui/material';

const CompanyDetail = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(COMPANY_DETAIL, {
    variables: { id },
  });

  const renderBreadcrumbs = () => {
    return (
      <Breadcrumbs aria-label='breadcrumb'>
        <Link component={LinkRouter} color='inherit' to='/companies'>
          Company
        </Link>
        <Typography color='textPrimary'>{id}</Typography>
      </Breadcrumbs>
    );
  };

  if (loading) return <ReactContentLoaderList />;
  if (error) return <Typography>Something went wrong.</Typography>;

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
          row={data?.companyDetail}
          headers={[
            { displayName: 'ID', key: 'id' },
            { displayName: 'Code', key: 'code' },
            { displayName: 'Name', key: 'name' },
          ]}
          renderFooters={
            <div>
              <Button
                color='primary'
                variant='contained'
                component={LinkRouter}
                to={`/companies/${id}/edit`}
                state={{ companyDetail: data.companyDetail }}
              >
                Edit Company
              </Button>
              <Button
                color='secondary'
                variant='contained'
                onClick={() => {
                  // settingsActions.showDialog({
                  //   dialogTitle: 'Hapus Banner',
                  //   dialogMessage: 'Apakah Anda yakin?',
                  //   dialogConfirmFunction: () => {
                  //     deleteFunction({
                  //       variables: {
                  //         id,
                  //       },
                  //     }).catch((err) => {
                  //       settingsActions.showErrorMessage(err.message);
                  //     });
                  //   },
                  // });
                }}
              >
                Delete Banner
              </Button>
            </div>
          }
        />
      </Box>
    </Box>
  );
};

export default CompanyDetail;
