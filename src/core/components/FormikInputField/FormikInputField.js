import React from 'react';

import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import Theme from '../../theme';

const useStyles = () => {
  const theme = Theme();
  const styles = {
    root: {
      marginBottom: 2,
    },
    formControl: {
      width: '100%',
    },
    error: {
      color: theme.colors.semanticError,
    },
  };
  return styles;
};

const FormikInputField = ({
  field: { onChange, name, value },
  form: { errors, touched },
  disabled,
  label,
  placeholder,
  required,
  type,
  multiline,
  inputProps,
  onChangeCustom,
  rows,
  specificErrorMessage,
  helperText,
}) => {
  const styles = useStyles();

  const isError = !!errors && !!touched && !!errors[name] && !!touched[name];

  const handleLabel = () => {
    if (!required) {
      return `${label} (optional)`;
    } else {
      return label;
    }
  };

  const renderMessage = () => {
    let message = '';
    if (specificErrorMessage) {
      message = specificErrorMessage;
    } else if (isError) {
      message = errors[name];
    }

    return (
      <Typography variant='subtitle2' sx={styles.error}>
        {message}
      </Typography>
    );
  };

  const handleOnChange = (event) => {
    if (onChangeCustom) {
      return onChangeCustom(event.target.value);
    }

    return onChange(event);
  };

  return (
    <Box sx={styles.root}>
      <FormControl sx={styles.formControl}>
        <TextField
          variant='outlined'
          helperText={helperText}
          disabled={disabled}
          label={handleLabel()}
          placeholder={placeholder}
          value={value}
          margin='normal'
          fullWidth
          InputProps={inputProps}
          name={name}
          onChange={(event) => {
            handleOnChange(event);
          }}
          error={isError}
          type={type}
          rows={rows}
          multiline={multiline}
        />
      </FormControl>
      {renderMessage()}
    </Box>
  );
};

export default FormikInputField;
