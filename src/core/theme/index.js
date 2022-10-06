import { createTheme } from '@mui/material/styles';

import palette from './Palette';
import typography from './Typography';
import overrides from './overrides';

const theme = createTheme({
  palette,
  typography,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export default theme;
