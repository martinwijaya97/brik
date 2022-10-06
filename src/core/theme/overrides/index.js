import MuiButton from './MuiButton';
import MuiIconButton from './MuiIconButton';
import MuiPaper from './MuiPaper';
import MuiTableCell from './MuiTableCell';
import MuiTableHead from './MuiTableHead';
import MuiTypography from './MuiTypography';

import GoldplayBoldWoff2 from '../../../assets/fonts/Goldplay-Bold/font.woff2';

const goldplayBold = {
  fontFamily: 'Goldplay',
  fontStyle: 'bold',
  fontDisplay: 'swap',
  fontWeight: 700,
  src: `
    local('Goldplay'),
    local('Goldplay-Black'),
    url(${GoldplayBoldWoff2}) format('woff2')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const Overrides = {
  MuiButton,
  MuiIconButton,
  MuiPaper,
  MuiTableCell,
  MuiTableHead,
  MuiTypography,
  MuiCssBaseline: {
    '@global': {
      '@font-face': [goldplayBold],
    },
  },
};

export default Overrides;
