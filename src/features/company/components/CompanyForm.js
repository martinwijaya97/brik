import React from 'react';
import { Formik, FastField } from 'formik';
import get from 'lodash/get';
import * as Yup from 'yup';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

import FormikInputField from '../../../core/components/FormikInputField';

import Theme from '../../../core/theme';
import { useMutation } from '@apollo/client';
import { COMPANY_CREATE, COMPANY_UPDATE } from '../services/mutations';
import { COMPANY_LIST } from '../services/queries';
import useGlobal from '../../../globalStore';

const useStyles = () => {
  const theme = Theme();
  const styles = {
    root: {
      marginTop: 1,
      border: 1,
      borderColor: theme.colors.brandPrimary,
    },
    header: {
      backgroundColor: theme.colors.brandPrimary,
      color: theme.colors.textSecondary,
    },
    buttonSubmit: {
      paddingX: 2,
      marginRight: 2,
      border: 1,
      backgroundColor: theme.colors.buttonActive,
      borderColor: theme.colors.buttonActive,
      color: theme.colors.textSecondary,
      '&:hover': {
        backgroundColor: theme.colors.buttonDisabled,
      },
    },
    buttonCancel: {
      paddingX: 2,
      border: 1,
      backgroundColor: theme.colors.semanticError,
      borderColor: theme.colors.semanticError,
      color: theme.colors.textSecondary,
      '&:hover': {
        backgroundColor: theme.colors.buttonDisabled,
      },
    },
  };
  return styles;
};

const CompanyForm = ({ id, isCreate, company }) => {
  const navigate = useNavigate();
  const styles = useStyles();

  const [, settingActions] = useGlobal(null, (actions) => actions.settings);

  const companyFormData = isCreate ? JSON.parse(window.localStorage.getItem('companyForm')) : company;

  const [createFunction, { loading: creating }] = useMutation(COMPANY_CREATE, {
    onError(error) {},
    onCompleted() {
      settingActions.showSuccessMessage('Company Created!');
      window.localStorage.removeItem('companyForm');
      navigate('/companies');
    },
  });

  const [updateFunction, { loading: updating }] = useMutation(COMPANY_UPDATE, {
    onError(error) {},
    onCompleted() {
      settingActions.showSuccessMessage('Company Updated!');
      window.localStorage.removeItem('companyForm');
      navigate('/companies/' + id);
    },
  });

  const renderBreadcrumbs = () => {
    if (!isCreate) {
      return (
        <Breadcrumbs aria-label='breadcrumb'>
          <Link component={LinkRouter} color='inherit' to='/companies'>
            Company
          </Link>
          <Link component={LinkRouter} color='inherit' to={`/companies/${id}`}>
            {id}
          </Link>
          <Typography color='textPrimary'>Edit</Typography>
        </Breadcrumbs>
      );
    }
  };

  const renderButtonSubmit = () => {
    const textButton = isCreate ? 'Create' : 'Update';
    return (
      <Button type='submit' sx={styles.buttonSubmit}>
        {textButton}
      </Button>
    );
  };

  const renderButtonCancel = () => {
    return (
      <Button
        sx={styles.buttonCancel}
        component={LinkRouter}
        onClick={() => {
          navigate(-1);
        }}
      >
        Cancel
      </Button>
    );
  };

  const renderFormFields = ({ values }) => {
    return (
      <Grid container>
        <Grid item md={6} xs={12}>
          <FastField
            name='code'
            label='Code'
            placeholder='Code'
            helperText='*Combination alphabet and numeric'
            component={FormikInputField}
            required
          />
          <FastField name='name' label='Name' placeholder='Name' component={FormikInputField} required />
        </Grid>
      </Grid>
    );
  };

  return (
    <LoadingOverlay active={creating || updating} spinner text='Loading...'>
      {renderBreadcrumbs()}
      <Formik
        initialValues={{
          id: get(companyFormData, 'id', ''),
          code: get(companyFormData, 'code', ''),
          name: get(companyFormData, 'name', ''),
        }}
        validateOnChange
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);

          Object.keys(values).forEach((key) => {
            if (values[key] === null || values[key] === '') {
              values[key] = undefined;
            }
          });

          const isEmpty = Object.values(values).every((x) => x === null || x === '');

          if (!isEmpty) {
            window.localStorage.setItem('companyForm', JSON.stringify(values));
          }

          const variables = {
            ...values,
          };

          if (isCreate) {
            createFunction({ variables });
          } else {
            updateFunction({ variables });
          }

          setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Name must be filled!'),
          code: Yup.string().required('Code must be filled!'),
        })}
        component={({ handleSubmit, setFieldValue, values }) => {
          const title = isCreate ? 'Company Create' : 'Company Update';

          return (
            <form onSubmit={handleSubmit} autoComplete='off' noValidate>
              <Card sx={styles.root}>
                <CardHeader style={styles.header} title={title} />
                <CardContent>{renderFormFields({ setFieldValue, values })}</CardContent>
                <Divider />
                <CardActions>
                  {renderButtonSubmit()}
                  {renderButtonCancel()}
                </CardActions>
              </Card>
            </form>
          );
        }}
      />
    </LoadingOverlay>
  );
};

export default CompanyForm;
