import React, { useState, useEffect } from 'react';

import useDebounce from '../../hooks/useDebounce';

import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Theme from '../../theme';

const useStyles = () => {
  const theme = Theme();
  const styles = {
    root: {
      marginBottom: 5,
    },
    formControl: {
      width: '100%',
    },
    textError: {
      color: theme.colors.semanticError,
    },
  };
  return styles;
};

const FormikAsyncSelect = ({
  field: { name, value },
  form: { errors = {}, touched = {}, setFieldValue } = {},
  isDisabled,
  label,
  disableClearable,
  loadOptions,
  multi,
  helperText,
  onChangeCustom,
  required,
  textFieldProps,
  specificErrorMessage,
  placeholder,
}) => {
  const styles = useStyles();

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedInputValue = useDebounce(inputValue, 500);

  const isError = !!errors && !!touched && !!errors[name] && !!touched[name];
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    (async () => {
      setIsLoading(true);
      const response = await loadOptions(debouncedInputValue);

      if (active) {
        setOptions(response);
        setIsLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [debouncedInputValue, loadOptions, loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
      setInputValue('');
    }
  }, [open]);

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
      <Typography variant='subtitle2' sx={styles.textError}>
        {message}
      </Typography>
    );
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <FormControl sx={styles.formControl}>
        <Autocomplete
          disableClearable={disableClearable}
          disabled={isDisabled}
          value={value}
          options={options}
          noOptionsText='Tidak ada hasil.'
          getOptionLabel={(item) =>
            typeof item === 'string' ? item : item?.label
          }
          renderInput={(textFieldProps) => (
            <TextField
              helperText={helperText}
              label={handleLabel()}
              value={value}
              error={isError}
              placeholder={placeholder}
              fullWidth
              onChange={(event) => {
                setOptions([]);
                setInputValue(event.target.value);
              }}
              InputProps={{
                ...textFieldProps.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {isLoading ? (
                      <CircularProgress color='inherit' size={20} />
                    ) : null}
                    {textFieldProps.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
              {...textFieldProps}
            />
          )}
          onChange={(event, newValue) => {
            if (typeof setFieldValue === 'function') {
              setFieldValue(name, newValue);
            }
            if (onChangeCustom) {
              onChangeCustom(newValue);
            }
          }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          loading={isLoading}
          multiple={multi}
          disableCloseOnSelect={multi}
          getOptionSelected={(option, value) => option.value === value.value}
        />
      </FormControl>
      {renderMessage()}
    </Box>
  );
};

export default FormikAsyncSelect;
