import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Theme from '../../../../core/theme';
import Logo from '../../../../assets/images/logo.png';
import { Login } from '../../services/mutations';
import { useMutation } from '@apollo/client';
import useGlobal from '../../../../globalStore';

const useStyles = () => {
  const theme = Theme();
  const styles = {
    root: {
      display: 'flex',
      height: '100vh',
    },
    leftSide: {
      flex: 1,
    },
    rightSide: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: 4,
      backgroundColor: theme.colors.brandPrimary,
    },
    title: {
      marginBottom: 4,
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    form: {
      width: '100%',
      maxWidth: 400,
    },
    inputField: {
      marginBottom: 2,
    },
    button: {
      width: '100%',
      padding: 1,
      backgroundColor: theme.colors.buttonActive,
      color: theme.colors.white,
    },
    image: {
      width: '100%',
      maxHeight: '100vh',
    },
  };
  return styles;
};

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const styles = useStyles();

  const [login, { data, loading, error }] = useMutation(Login);

  const [authState, authAction] = useGlobal(
    (state) => state.auth,
    (action) => action.auth
  );

  console.log('globalState', authState);
  console.log('globalActions', authAction);

  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    try {
      const response = await login({
        variables: {
          input: { email, password },
        },
      });

      if (response.data && response.data.login.token) {
        const token = response.data.login.token;

        await authAction.setToken({ token });

        window.location.reload();
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <Box sx={styles.root}>
      {/* Left Side */}
      <Box sx={styles.leftSide}>
        <img src={Logo} alt='Sign In' style={styles.image} />
      </Box>

      {/* Right Side */}
      <Box sx={styles.rightSide}>
        <Box sx={{ background: 'white', padding: 4, borderRadius: 8 }}>
          <Typography sx={styles.title}>Sign In</Typography>
          <form style={styles.form} onSubmit={handleSignIn}>
            <TextField
              label='Email'
              variant='outlined'
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={styles.inputField}
            />
            <TextField
              label='Password'
              variant='outlined'
              type='password'
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={styles.inputField}
            />
            <Button sx={styles.button} onClick={handleSignIn} variant='contained' disabled={loading} type='submit'>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
