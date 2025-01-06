import { Box } from '@mui/material';
import React from 'react';
import { Route } from 'react-router-dom';

// RouteWithLayout component should accept props: layout (Layout component) and component (Component to render)
const RouteWithLayout = ({ layout: Layout, component: Component, ...rest }) => {
  // return (
  //   <Route
  //     {...rest} // Spread any other props like path, exact, etc.
  //     element={
  //       <Layout>
  //         <Component />
  //       </Layout>
  //     }
  //   />
  // );

  return (
    <Box>
      <Layout>
        <Component />
      </Layout>
    </Box>
  );
};

export default RouteWithLayout;
