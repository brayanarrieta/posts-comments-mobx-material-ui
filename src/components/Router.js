import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CategoriesTable from './CategoriesTable';
import ProductsTable from './ProductsTable';

export default function Router() {
  return (
    <Switch>
      <Route path="/categories" component={CategoriesTable} />
      <Route path="/products" component={ProductsTable} />
    </Switch>
  );
}
