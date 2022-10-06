import palette from '../Palette';
import typography from '../Typography';

const MuiTableCell = {
  root: {
    ...typography.body1,
    borderBottom: `1px solid ${palette.divider}`,
  },
};

export default MuiTableCell;
