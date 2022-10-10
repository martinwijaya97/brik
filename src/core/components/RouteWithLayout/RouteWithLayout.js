import React from 'react';
import { Route } from 'react-router-dom';

const RouteWithLayout = (props) => {
  const { permission, layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

export default RouteWithLayout;
