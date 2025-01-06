import { Box } from '@mui/material';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const RouteWithoutLayout = (props) => {
  const { permission, component: Component, ...rest } = props;

  return (
    <Box>
      {/* <Layout> */}
      <Component />
      {/* </Layout> */}
    </Box>
  );
};

export default RouteWithoutLayout;
