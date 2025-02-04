import React from 'react';
import { useParams, Link as LinkRouter, useNavigate } from 'react-router-dom';
import { List as ReactContentLoaderList } from 'react-content-loader';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import FeatureDetail from '../../../../core/components/FeatureDetail';
import { useMutation, useQuery } from '@apollo/client';
import { COMPANY_DETAIL } from '../../services/queries';
import { Button } from '@mui/material';
import Theme from '../../../../core/theme';
import { COMPANY_DELETE } from '../../services/mutations';
import useGlobal from '../../../../globalStore';
import FeatureTable from '../../../../core/components/FeatureTable';

// Define styles using a hook
const useStyles = () => {
  const theme = Theme();
  return {
    breadcrumbs: {
      marginBottom: 2,
    },
    detailContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      marginTop: 2,
      gap: 4,
    },
    editButton: {
      color: theme.colors.textSecondary,
      backgroundColor: theme.colors.buttonActive,
      marginRight: 2,
      '&:hover': {
        backgroundColor: theme.colors.buttonDisabled,
      },
    },
    deleteButton: {
      color: theme.colors.textSecondary,
      backgroundColor: theme.colors.buttonDelete,
      marginRight: 2,
      '&:hover': {
        backgroundColor: theme.colors.buttonDisabled,
      },
    },
  };
};

const CompanyDetail = () => {
  const styles = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();

  const [, settingActions] = useGlobal(null, (actions) => actions.settings);

  const { data, loading, error } = useQuery(COMPANY_DETAIL, {
    variables: { id },
  });

  const [deleteFunction, { loading: deleting }] = useMutation(COMPANY_DELETE, {
    variables: { id },
    onError(error) {},
    onCompleted() {
      settingActions.showSuccessMessage('Company Deleted!');
      navigate('/companies');
    },
  });

  const renderBreadcrumbs = () => (
    <Breadcrumbs aria-label='breadcrumb' sx={styles.breadcrumbs}>
      <Link component={LinkRouter} color='inherit' to='/companies'>
        Company
      </Link>
      <Typography color='textPrimary'>{id}</Typography>
    </Breadcrumbs>
  );

  if (loading) return <ReactContentLoaderList />;
  if (error) return <Typography>Something went wrong.</Typography>;

  const renderButtonEdit = () => {
    return (
      <Button
        sx={styles.editButton}
        component={LinkRouter}
        to={`/companies/${id}/edit`}
        state={{ companyDetail: data.companyDetail }}
      >
        Edit Company
      </Button>
    );
  };

  const renderButtonDelete = () => {
    return (
      <Button
        sx={styles.deleteButton}
        onClick={() => {
          settingActions.showDialog({
            dialogTitle: 'Delete Company',
            dialogMessage: 'Are you sure you want to delete this company?',
            dialogConfirmFunction: () => {
              deleteFunction();
            },
          });
        }}
      >
        Delete Company
      </Button>
    );
  };

  return (
    <Box>
      {renderBreadcrumbs()}
      <Box sx={styles.detailContainer}>
        <FeatureDetail
          title='Company Detail'
          row={data?.companyDetail}
          isLoading={deleting}
          headers={[
            { displayName: 'ID', key: 'id' },
            { displayName: 'Code', key: 'code' },
            { displayName: 'Name', key: 'name' },
          ]}
          renderFooters={
            <div>
              {renderButtonEdit()}
              {renderButtonDelete()}
            </div>
          }
        />
        <FeatureTable
          title='Plants '
          rows={data?.companyDetail?.plants}
          rowKey='number'
          isLoading={loading}
          headers={[
            { displayName: 'ID', key: 'id' },
            { displayName: 'Code', key: 'code' },
            { displayName: 'Name', key: 'name' },
          ]}
          rowOnClick={(row) => navigate(`/companies/${row.id}`)}
          // totalItems={totalItems}
          // rowsPerPage={rowsPerPage}
          // page={page}
          tablePagination
          // onChangePage={handleChangePage}
          // onChangeRowsPerPage={handleChangeRowsPerPage}
          rowsPerPageOptions={[5]}
          // sortFunction={handleSortFunction}
          // sortByDirection={sortByDirection}
          // sortByColumnName={sortByColumnName}
        />
      </Box>
    </Box>
  );
};

export default CompanyDetail;
