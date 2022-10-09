import * as React from 'react';

import { useHistory, useLocation } from 'react-router';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Theme from '../../theme';

const useStyles = () => {
  const theme = Theme();
  const styles = {
    wrapListItem: {
      padding: 5,
      backgroundColor: 'red',
    },
    textListItemActive: {
      color: theme.colors.textQuaternary,
    },
    textListItemStandBy: {
      color: theme.colors.textPrimary,
    },
  };

  return styles;
};

const Sidebar = ({ open, handleClose }) => {
  const theme = Theme();
  const styles = useStyles();
  const location = useLocation();
  const history = useHistory();

  const renderListItem = ({ title, path }) => {
    const isActive = location.pathname === path;
    const styleText = isActive
      ? styles.textListItemActive
      : styles.textListItemStandBy;

    return (
      <ListItem
        button
        sx={{
          paddingX: 6,
          paddingY: 2,
          borderBottom: 1,
          borderColor: theme.colors.greyScale3,
        }}
      >
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
