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

import { MachineAction } from '../../../redux/actions/MachineAction';

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

const plantList = [
  {
    plant_code: 1721,
    plant_name: 'CPI Processing Plant',
    company_code: '1720',
    plant_address: 'Jln. Ancol 1',
    updated_by: '',
    updated_at: '',
  },
  {
    plant_code: 1722,
    plant_name: 'CPI Cikande Premix',
    company_code: '1720',
    plant_address: 'Jln. Ancol 10',
    updated_by: '',
    updated_at: '',
  },
  {
    plant_code: 1723,
    plant_name: 'CPI Cikande Bread Crumb',
    company_code: '1720',
    plant_address: 'Jln. Ancol 11',
    updated_by: '',
    updated_at: '',
  },
];

const roomList = [
  {
    id: 1,
    room_code: 'CR01',
    plant_code: 1720,
    room_name: 'Cold Room 1',
    created_by: 'agus',
    created_at: '2024-12-02',
    updated_by: '',
    updated_at: '',
  },
  {
    id: 2,
    room_code: 'CR01',
    plant_code: 1721,
    room_name: 'Cold Room 1',
    created_by: 'agus',
    created_at: '2024-12-02',
    updated_by: '',
    updated_at: '',
  },
  {
    id: 3,
    room_code: 'CR02',
    plant_code: 1721,
    room_name: 'Cold Room 2',
    created_by: 'agus',
    created_at: '2024-12-02',
    updated_by: '',
    updated_at: '',
  },
];

const MachineForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const styles = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const machineFormData = JSON.parse(window.localStorage.getItem('machineForm')) || {};

  const loadBrandOptions = async () => {
    const response = [
      { id: 1, name: 'Bitzer' },
      { id: 2, name: 'Yamato' },
      { id: 3, name: 'Naruto' },
    ];

    const options = response.map((category) => {
      return {
        label: category.name,
        value: category.id,
      };
    });

    return options;
  };
  const loadCategoryOptions = async () => {
    const response = [
      { id: 1, name: 'AHE - 192' },
      { id: 2, name: 'GTE - 394' },
      { id: 3, name: 'YFV - 738' },
    ];

    const options = response.map((category) => {
      return {
        label: category.name,
        value: category.id,
      };
    });

    return options;
  };

  const loadPlantOptions = async () => {
    const response = plantList;

    const options = response.map((plant) => {
      return {
        label: `${plant.plant_code} - ${plant.plant_name}`,
        value: plant.plant_code,
      };
    });

    return options;
  };

  const loadRoomOptions = async () => {
    const response = roomList;

    const options = response.map((room) => {
      return {
        label: `${room.room_code} - ${room.room_name} `,
        value: room.id,
      };
    });

    return options;
  };

  const createFunction = async (variables) => {
    const result = await dispatch(MachineAction.createMachine({ ...variables }));

    if (result) {
      window.localStorage.setItem('machineForm', JSON.stringify({}));
      history.push('/machines');
    }
  };

  const uploadImage = async (values) => {
    const result = await dispatch(MachineAction.machineUploadImage({ file: values[0] }));
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
        <Link component={LinkRouter} color='inherit' to='/machines'>
          Machine
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
      <Button sx={styles.buttonCancel} component={LinkRouter} to='/machines'>
        Cancel
      </Button>
    );
  };

  const renderFormFields = ({ values, setFieldValue }) => {
    const isEmpty = Object.values(values).every((x) => x === null || x === '');

    if (!isEmpty) {
      window.localStorage.setItem('machineForm', JSON.stringify(values));
    }

    return (
      <Grid container columnSpacing={2}>
        <Grid item md={6} xs={12}>
          <Field
            name='machineName'
            label='Machine Name'
            placeholder='Machine Name'
            component={FormikInputField}
            required
          />
          <Field
            name='machineCode'
            label='Machine Code'
            placeholder='Machine Code'
            component={FormikInputField}
            required
          />
          <Field
            name='machineBrand'
            label='Machine Brand'
            loadOptions={loadBrandOptions}
            component={FormikAsyncSelect}
            required
          />
          <Field
            name='machineModel'
            label='Machine Model'
            loadOptions={loadCategoryOptions}
            component={FormikAsyncSelect}
            required
          />
          <FastField
            name='subInstrumentCode'
            label='Sub Instrument Code'
            placeholder='Sub Instrument Code'
            component={FormikInputField}
            required
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Field
            name='plantCode'
            label='Plant'
            loadOptions={loadPlantOptions}
            component={FormikAsyncSelect}
            onChangeCustom={() => setFieldValue('roomCode', [])}
            required
          />
          <Field
            name='roomCode'
            label='Room'
            loadOptions={loadRoomOptions}
            component={FormikAsyncSelect}
            isDisabled={!values.plantCode}
            multi
            required
          />
          <FastField name='image' required label='Image' component={FormikUploadFile} acceptedFileType='image/*' />
        </Grid>
      </Grid>
    );
  };

  return (
    <LoadingOverlay active={isLoading} spinner text='Loading...'>
      {renderBreadcrumbs()}
      <Formik
        initialValues={{
          id: get(machineFormData, 'id', ''),
          machineCode: get(machineFormData, 'machineCode', ''),
          machineName: get(machineFormData, 'machineName', ''),
          machineModel: get(machineFormData, 'machineModel', ''),
          subInstrumentCode: get(machineFormData, 'subInstrumentCode', ''),
          plantCode: get(machineFormData, 'plantCode', ''),
          roomCode: get(machineFormData, 'roomCode', ''),
          image: get(machineFormData, 'image', ''),
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
          machineCode: Yup.string().required('Machine Code must be filled!'),
          machineName: Yup.string().required('Machine Name must be filled!'),
          machineModel: Yup.object().required('Machine Model must be filled!').nullable(),
          subInstrumentCode: Yup.string().required('Sub Instrument Code must be filled!'),
          plantCode: Yup.object().required('Plant must be filled!').nullable(),
          roomCode: Yup.array()
            .min(1, 'You must filled at least one room!')
            .required('Room must be filled!')
            .nullable(),
          image: Yup.array()
            .of(
              Yup.object()
                .shape({
                  preview: Yup.string().required('Preview is required!').url('Preview must be a valid URL!'),
                  file: Yup.mixed()
                    .required('File is required!')
                    .test(
                      'fileType',
                      'Unsupported file format!',
                      (value) => value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
                    ),
                })
                .nullable()
            )
            .min(1, 'You must upload at least one image!')
            .required('Image array must be filled!')
            .nullable(),
        })}
        component={({ handleSubmit, setFieldValue, values }) => {
          return (
            <form onSubmit={handleSubmit} autoComplete='off' noValidate>
              <Card sx={styles.root}>
                <CardHeader style={styles.header} title='Machine Create' />
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

export default MachineForm;
