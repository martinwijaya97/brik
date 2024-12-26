import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import RouteWithLayout from '../components/RouteWithLayout';
import Layout from '../layout';

// //Banner
// import BannerListPage from '../../features/banner/pages/BannerList';
// import BannerCreatePage from '../../features/banner/pages/BannerCreate';
// import BannerDetailPage from '../../features/banner/pages/BannerDetail';
// import BannerEditPage from '../../features/banner/pages/BannerEdit';

//Company
import CompanyListPage from '../../features/company/pages/CompanyList';
import CompanyCreatePage from '../../features/company/pages/CompanyCreate';
import CompanyDetailPage from '../../features/company/pages/CompanyDetail';
import CompanyEditPage from '../../features/company/pages/CompanyEdit';

//Plant
import PlantListPage from '../../features/plant/pages/PlantList';
import PlantCreatePage from '../../features/plant/pages/PlantCreate';
import PlantDetailPage from '../../features/plant/pages/PlantDetail';
import PlantEditPage from '../../features/plant/pages/PlantEdit';

//Machine
import MachineCreatePage from '../../features/machine/pages/MachineCreate';
import MachineDetailPage from '../../features/machine/pages/MachineDetail';
import MachineEditPage from '../../features/machine/pages/MachineEdit';
import MachineListPage from '../../features/machine/pages/MachineList';
import DashboardPage from '../../features/dashboard';

// //Subcategory
// import SubcategoryListPage from '../../features/subcategory/pages/SubcategoryList';
// import SubcategoryCreatePage from '../../features/subcategory/pages/SubcategoryCreate';
// import SubcategoryDetailPage from '../../features/subcategory/pages/SubcategoryDetail';
// import SubcategoryEditPage from '../../features/subcategory/pages/SubcategoryEdit';

// //Collection
// import CollectionListPage from '../../features/collection/pages/CollectionList';
// import CollectionCreatePage from '../../features/collection/pages/CollectionCreate';
// import CollectionDetailPage from '../../features/collection/pages/CollectionDetail';
// import CollectionEditPage from '../../features/collection/pages/CollectionEdit';

// //Portfolio
// import PortfolioListPage from '../../features/portfolio/pages/PortfolioList';
// import PortfolioCreatePage from '../../features/portfolio/pages/PortfolioCreate';
// import PortfolioDetailPage from '../../features/portfolio/pages/PortfolioDetail';
// import PortfolioEditPage from '../../features/portfolio/pages/PortfolioEdit';

// //Sign In
// import SignInPage from '../../features/auth/pages/SignIn';

const Routers = () => {
  return (
    <Switch>
      <Redirect exact from='/' to='/dashboard' />

      {/* Dashboard */}
      <RouteWithLayout layout={Layout} exact path='/dashboard' component={DashboardPage} />

      {/* Company */}
      <RouteWithLayout layout={Layout} exact path='/companies' component={CompanyListPage} />
      <RouteWithLayout layout={Layout} exact path='/companies/create' component={CompanyCreatePage} />
      <RouteWithLayout layout={Layout} exact path='/companies/:id' component={CompanyDetailPage} />
      <RouteWithLayout layout={Layout} exact path='/companies/:id/edit' component={CompanyEditPage} />

      {/* Plant */}
      <RouteWithLayout layout={Layout} exact path='/plants' component={PlantListPage} />
      <RouteWithLayout layout={Layout} exact path='/plants/create' component={PlantCreatePage} />
      <RouteWithLayout layout={Layout} exact path='/plants/:id' component={PlantDetailPage} />
      <RouteWithLayout layout={Layout} exact path='/plants/:id/edit' component={PlantEditPage} />

      {/* Machine */}
      <RouteWithLayout layout={Layout} exact path='/machines' component={MachineListPage} />
      <RouteWithLayout layout={Layout} exact path='/machines/create' component={MachineCreatePage} />
      <RouteWithLayout layout={Layout} exact path='/machines/:id' component={MachineDetailPage} />
      <RouteWithLayout layout={Layout} exact path='/machines/:id/edit' component={MachineEditPage} />

      {/* <RouteWithoutLayout exact path='/sign-in' component={SignInPage} /> */}
    </Switch>
  );
};
export default Routers;
