import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// Import Layout and Route Wrappers
import RouteWithoutLayout from '../components/RouteWithoutLayout';
import RouteWithLayout from '../components/RouteWithLayout';
import Layout from '../layout';

// Company Pages
import CompanyListPage from '../../features/company/pages/CompanyList';
import CompanyCreatePage from '../../features/company/pages/CompanyCreate';
import CompanyDetailPage from '../../features/company/pages/CompanyDetail';
import CompanyEditPage from '../../features/company/pages/CompanyEdit';

// Plant Pages
import PlantListPage from '../../features/plant/pages/PlantList';
import PlantCreatePage from '../../features/plant/pages/PlantCreate';
import PlantDetailPage from '../../features/plant/pages/PlantDetail';
import PlantEditPage from '../../features/plant/pages/PlantEdit';

// Machine Pages
import MachineCreatePage from '../../features/machine/pages/MachineCreate';
import MachineDetailPage from '../../features/machine/pages/MachineDetail';
import MachineEditPage from '../../features/machine/pages/MachineEdit';
import MachineListPage from '../../features/machine/pages/MachineList';

// Dashboard & Authentication
import DashboardPage from '../../features/dashboard';
import SignIn from '../../features/auth/pages/SignIn';

const Routers = () => {
  return (
    <Routes>
      {/* Redirect to /dashboard if the path is '/' */}
      <Route path='/' element={<Navigate to='/dashboard' />} />

      {/* Dashboard Route */}

      {/* <RouteWithLayout path='/dashboard' layout={Layout} component={DashboardPage} /> */}

      <Route path='/dashboard' element={<RouteWithLayout layout={Layout} component={DashboardPage} />} />

      {/* Company Routes */}
      <Route path='/companies' element={<RouteWithLayout layout={Layout} component={CompanyListPage} />} />
      <Route path='/companies/create' element={<RouteWithLayout layout={Layout} component={CompanyCreatePage} />} />
      <Route path='/companies/:id' element={<RouteWithLayout layout={Layout} component={CompanyDetailPage} />} />
      <Route path='/companies/:id/edit' element={<RouteWithLayout layout={Layout} component={CompanyEditPage} />} />

      {/* Plant Routes */}
      <Route path='/plants' element={<RouteWithLayout layout={Layout} component={PlantListPage} />} />
      <Route path='/plants/create' element={<RouteWithLayout layout={Layout} component={PlantCreatePage} />} />
      <Route path='/plants/:id' element={<RouteWithLayout layout={Layout} component={PlantDetailPage} />} />
      <Route path='/plants/:id/edit' element={<RouteWithLayout layout={Layout} component={PlantEditPage} />} />

      {/* Machine Routes */}
      <Route path='/machines' element={<RouteWithLayout layout={Layout} component={MachineListPage} />} />
      <Route path='/machines/create' element={<RouteWithLayout layout={Layout} component={MachineCreatePage} />} />
      <Route path='/machines/:id' element={<RouteWithLayout layout={Layout} component={MachineDetailPage} />} />
      <Route path='/machines/:id/edit' element={<RouteWithLayout layout={Layout} component={MachineEditPage} />} />

      {/* Sign In Route */}
      <Route path='/sign-in' element={<RouteWithoutLayout component={SignIn} />} />
    </Routes>
  );
};

export default Routers;
