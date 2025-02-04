import React, { useState } from 'react';
import { Box, Button, Drawer, IconButton, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FeatureFilterSelectForm from './components/FeatureFilterSelectForm';

const useStyles = () => {
  return {
    buttonContainer: {
      position: 'relative',
      display: 'inline-flex',
    },
    dotMark: {
      position: 'absolute',
      width: 10,
      height: 10,
      borderRadius: '50%',
      left: 24,
      top: 6,
      backgroundColor: 'error.main',
    },
    drawerContent: {
      display: 'flex',
      flexDirection: 'column',
      width: 250,
      padding: 2,
      height: '100%',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 2,
      borderBottom: 1,
    },
    content: {
      flexGrow: 1,
      overflowY: 'auto',
      pt: 2,
      pb: 2,
    },
  };
};

const FeatureFilterSidebar = ({ children, isFilterActive, onClearFilters, features }) => {
  const styles = useStyles();
  const [isShowDrawer, setIsShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setIsShowDrawer((prev) => !prev);
  };

  const renderRedDot = () => {
    if (isFilterActive) {
      return <Box sx={styles.dotMark} />;
    }
  };

  // const renderFeatureFilterItem = (feature) => {
  //   switch (feature.type) {
  //     case 'select':
  //       return (
  //         <FeatureFilterSelectForm
  //           label={feature?.label}
  //           value={feature?.value}
  //           onChange={feature?.onChange}
  //           list={feature?.list}
  //         />
  //       );

  //     default:
  //       break;
  //   }
  // };
  // const renderFeatureFilters = () => {
  //   return features.map((feature, index) => {
  //     return renderFeatureFilterItem(feature);
  //   });
  // };

  return (
    <>
      <Box sx={styles.buttonContainer}>
        <Button variant='outlined' startIcon={<FilterListIcon />} onClick={toggleDrawer}>
          Show Filter
        </Button>
        {renderRedDot()}
      </Box>
      <Drawer anchor='right' open={isShowDrawer} onClose={toggleDrawer}>
        <Box sx={styles.drawerContent}>
          <Box sx={styles.header}>
            <Typography variant='h6'>Filter</Typography>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={styles.content}>{children}</Box>
          <Box>
            <Button
              startIcon={<DeleteOutlineIcon />}
              onClick={onClearFilters}
              variant='contained'
              fullWidth
              color='error'
            >
              Clear Filter
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default FeatureFilterSidebar;
