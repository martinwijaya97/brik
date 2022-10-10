import React from 'react';

import { useHistory, useLocation } from 'react-router';

import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Theme from '../../theme';
import { Typography } from '@mui/material';
import { isMobileDevice } from '../../utils';

const useStyles = () => {
  const theme = Theme();
  const styles = {
    root: {
      borderRight: 1,
      borderColor: theme.colors.brandPrimary,
    },
    wrapListItem: {
      paddingX: 6,
      paddingY: 2,
      borderBottom: 1,
      borderColor: theme.colors.greyScale3,
    },
    textListItemActive: {
      color: theme.colors.textQuaternary,
      fontSize: theme.fontSize[14],
    },
    textListItemStandBy: {
      color: theme.colors.textPrimary,
      fontSize: theme.fontSize[14],
    },
  };

  return styles;
};

const Sidebar = ({ open, handleClose }) => {
  const styles = useStyles();
  const location = useLocation();
  const history = useHistory();
  const isMobile = isMobileDevice();

  const renderListItem = ({ title, path }) => {
    const isActive = location.pathname.includes(path);

    const styleText = isActive
      ? styles.textListItemActive
      : styles.textListItemStandBy;

    return (
      <ListItem button sx={styles.wrapListItem}>
        <ListItemText
          onClick={() => {
            history.push(path);
          }}
          primary={<Typography sx={styleText}>{title}</Typography>}
        />
      </ListItem>
    );
  };

  const renderList = () => {
    return (
      <List>{renderListItem({ path: '/products', title: 'Product' })}</List>
    );
  };

  if (isMobile) {
    return (
      <Drawer anchor={'left'} open={open} onClose={handleClose}>
        {renderList()}
      </Drawer>
    );
  } else {
    return <Box sx={styles.root}>{renderList()}</Box>;
  }
};

export default Sidebar;
