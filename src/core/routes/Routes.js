import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import RouteWithLayout from '../components/RouteWithLayout';
import Layout from '../layout';

// //Banner
// import BannerListPage from '../../features/banner/pages/BannerList';
// import BannerCreatePage from '../../features/banner/pages/BannerCreate';
// import BannerDetailPage from '../../features/banner/pages/BannerDetail';
// import BannerEditPage from '../../features/banner/pages/BannerEdit';

// //Category
// import CategoryListPage from '../../features/category/pages/CategoryList';
// import CategoryCreatePage from '../../features/category/pages/CategoryCreate';
// import CategoryDetailPage from '../../features/category/pages/CategoryDetail';
// import CategoryEditPage from '../../features/category/pages/CategoryEdit';

//Product
import ProductListPage from '../../features/product/pages/ProductList';
import ProductCreatePage from '../../features/product/pages/ProductCreate';
import ProductDetailPage from '../../features/product/pages/ProductDetail';
import ProductEditPage from '../../features/product/pages/ProductEdit';

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
      <Redirect exact from='/' to='/products' />

      {/* Product */}
      <RouteWithLayout
        layout={Layout}
        exact
        path='/products'
        component={ProductListPage}
      />
      <RouteWithLayout
        layout={Layout}
        exact
        path='/products/create'
        component={ProductCreatePage}
      />
      <RouteWithLayout
        layout={Layout}
        exact
        path='/products/:id'
        component={ProductDetailPage}
      />
      <RouteWithLayout
        layout={Layout}
        exact
        path='/products/:id/edit'
        component={ProductEditPage}
      />

      {/* <RouteWithoutLayout exact path='/sign-in' component={SignInPage} /> */}
    </Switch>
  );
};
export default Routers;
