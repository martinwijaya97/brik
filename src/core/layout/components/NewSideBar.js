import * as React from 'react';

import { useHistory, useLocation } from 'react-router';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Theme from '../../theme';

const useStyles = () => {
  const theme = Theme();
  console.log(theme);
  const styles = {
    wrapListItem: {
      padding: 10,
    },
    textListItemActive: {
      color: theme.colors.textQuaternary,
    },
    textListItemInactive: {
      color: theme.colors.textPrimary,
    },
  };
  return styles;
};

const Sidebar = ({ open, handleClose }) => {
  const location = useLocation();
  const history = useHistory();
  const styles = useStyles();

  const renderListItem = ({ title, path }) => {
    const isActive = location.pathname === path;
    const styleText = isActive
      ? styles.textListItemActive
      : styles.textListItemInactive;

    return (
      <ListItem button sx={styles.wrapListItem}>
        <ListItemText
          sx={styleText}
          onClick={() => {
            history.push(path);
          }}
          primary={title}
        />
      </ListItem>
    );
  };

  const renderList = () => {
    return (
      <List>{renderListItem({ path: '/products', title: 'Product' })}</List>
    );
  };

  return (
    <Drawer anchor={'left'} open={true} onClose={handleClose}>
      {renderList()}
    </Drawer>
  );
};

export default Sidebar;
