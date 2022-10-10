import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, FastField, Field } from 'formik';
import get from 'lodash/get';
import * as Yup from 'yup';
import { Link as LinkRouter, useHistory } from 'react-router-dom';
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
import FormikUploadFile from '../../../core/components/FormikUploadFile';

import { ProductAction } from '../../../redux/actions/ProductAction';

import Theme from '../../../core/theme';
import FormikAsyncSelect from '../../../core/components/FormikAsyncSelect';

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

const ProductForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const styles = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const productFormData =
    JSON.parse(window.localStorage.getItem('productForm')) || {};

  const loadCategoryOptions = async () => {
    const response = [
      { id: 1, name: 'makanan' },
      { id: 2, name: 'minuman' },
      { id: 3, name: 'cemilan' },
    ];

    const options = response.map((category) => {
      return {
        label: category.name,
        value: category.id,
      };
    });

    return options;
  };

  const createFunction = async (variables) => {
    const result = await dispatch(
      ProductAction.createProduct({ ...variables })
    );

    if (result) {
      window.localStorage.setItem('productForm', JSON.stringify({}));
      history.push('/products');
    }
  };

  const uploadImage = async (values) => {
    const result = await dispatch(
      ProductAction.productUploadImage({ file: values[0] })
    );
    return result;
  };

  const checkImage = async (values) => {
    if (values) {
      if (typeof values !== 'string') {
        const image = await uploadImage(values);
        return image;
      } else {
        return values;
      }
    }
  };

  const renderBreadcrumbs = () => {
    return (
      <Breadcrumbs aria-label='breadcrumb'>
        <Link component={LinkRouter} color='inherit' to='/products'>
          Product
        </Link>
        <Typography color='textPrimary'> Create </Typography>
      </Breadcrumbs>
    );
  };

  const renderButtonSubmit = () => {
    return (
      <Button type='submit' sx={styles.buttonSubmit}>
        Create
      </Button>
    );
  };

  const renderButtonCancel = () => {
    return (
      <Button sx={styles.buttonCancel} component={LinkRouter} to='/products'>
        Cancel
      </Button>
    );
  };

  const renderFormFields = ({ values }) => {
    const isEmpty = Object.values(values).every((x) => x === null || x === '');

    if (!isEmpty) {
      window.localStorage.setItem('productForm', JSON.stringify(values));
    }

    return (
      <Grid container>
        <Grid item md={6} xs={12}>
          <FastField
            name='name'
            label='Name'
            placeholder='Name'
            component={FormikInputField}
            required
          />
          <FastField
            name='sku'
            label='SKU'
            placeholder='SKU'
            helperText='*Combination alphabet and numeric'
            component={FormikInputField}
            required
          />
          <FastField
            name='description'
            label='Description'
            placeholder='Description'
            component={FormikInputField}
          />
          <Field
            name='category'
            label='Category'
            loadOptions={loadCategoryOptions}
            component={FormikAsyncSelect}
            required
          />
          <FastField
            name='price'
            label='Price'
            type='number'
            placeholder='Price'
            component={FormikInputField}
            required
          />
          <FastField
            name='weight'
            label='Weight'
            placeholder='Weight'
            helperText='*Must be under or equal 100'
            type='number'
            component={FormikInputField}
            required
          />
          <FastField
            name='width'
            label='Width'
            placeholder='Width'
            type='number'
            component={FormikInputField}
            required
          />
          <FastField
            name='length'
            label='Length'
            placeholder='Length'
            type='number'
            component={FormikInputField}
            required
          />
          <FastField
            name='height'
            label='Height'
            placeholder='Height'
            type='number'
            component={FormikInputField}
            required
          />
          <Field
            name='image'
            required
            label='Image'
            component={FormikUploadFile}
            acceptedFileType='image/*'
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <LoadingOverlay active={isLoading} spinner text='Loading...'>
      {renderBreadcrumbs()}
      <Formik
        initialValues={{
          id: get(productFormData, 'id', ''),
          sku: get(productFormData, 'sku', ''),
          name: get(productFormData, 'name', ''),
          description: get(productFormData, 'description', ''),
          price: get(productFormData, 'price', ''),
          width: get(productFormData, 'width', ''),
          weight: get(productFormData, 'weight', ''),
          length: get(productFormData, 'length', ''),
          height: get(productFormData, 'height', ''),
          category: get(productFormData, 'category', ''),
          image: get(productFormData, 'image', ''),
        }}
        validateOnChange
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          setIsLoading(true);

          Object.keys(values).forEach((key) => {
            if (values[key] === null || values[key] === '') {
              values[key] = undefined;
            }
          });

          const image = await checkImage(values.image);
          const variables = {
            ...values,
            image,
            categoryId: values.category.value,
            categoryName: values.category.label,
          };

          await createFunction(variables);

          setIsLoading(false);
          setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Name must be filled!'),
          sku: Yup.string().required('SKU must be filled!'),
          category: Yup.object()
            .required('category must be filled!')
            .nullable(),
          price: Yup.number()
            .min(1, 'Must be more than 0')
            .required('Weight must be filled!'),
          width: Yup.number()
            .min(1, 'Must be more than 0')
            .required('Weight must be filled!'),
          length: Yup.number()
            .min(1, 'Must be more than 0')
            .required('Weight must be filled!'),
          height: Yup.number()
            .min(1, 'Must be more than 0')
            .required('Weight must be filled!'),
          weight: Yup.number()
            .min(1, 'Must be more than 0')
            .max(100, 'Must be under or equal 100')
            .required('Weight must be filled!'),
        })}
        component={({ handleSubmit, setFieldValue, values }) => {
          return (
            <form onSubmit={handleSubmit} autoComplete='off' noValidate>
              <Card sx={styles.root}>
                <CardHeader style={styles.header} title='Product Create' />
                <CardContent>
                  {renderFormFields({ setFieldValue, values })}
                </CardContent>
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

export default ProductForm;
