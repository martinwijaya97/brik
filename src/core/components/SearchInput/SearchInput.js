import React, { useState } from 'react';

import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Theme from '../../theme';

const useStyles = () => {
  const theme = Theme();
  const styles = {
    root: {
      borderRadius: '5px',
      alignItems: 'center',
      display: 'inline-flex',
      border: 1,
      minWidth: '100%',
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.greyScale2,
    },
    wrapIcon: {
      display: 'flex',
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '4px',
      height: 32,
      width: 70,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.greyScale2,
    },
    icon: {
      color: theme.colors.background,
    },
    input: {
      paddingLeft: 1,
      flex: 1,
      flexGrow: 1,
      fontSize: '14px',
      lineHeight: '16px',
      letterSpacing: '-0.05px',
    },
    button: {
      display: 'flex',
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '4px',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      height: 32,
      width: 70,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.buttonActive,
    },
  };
  return styles;
};

const SearchInput = ({ onChange, onClick }) => {
  const styles = useStyles();

  const [value, setValue] = useState('');

  const handleInput = (event) => {
    if (onChange) {
      onChange(event);
    }
    setValue(event.target.value);
  };

  const handleButtonCLick = () => {
    if (onClick) {
      onClick(value);
    }
  };

  const renderInput = () => {
    return (
      <Input
        sx={styles.input}
        disableUnderline
        onChange={(event) => {
          handleInput(event);
        }}
      />
    );
  };

  const renderButton = () => {
    return (
      <Button style={styles.button} onClick={handleButtonCLick}>
        <SearchIcon sx={styles.icon} />
      </Button>
    );
  };

  return (
    <Box sx={styles.root}>
      {renderInput()}
      {renderButton()}
    </Box>
  );
};

export default SearchInput;
