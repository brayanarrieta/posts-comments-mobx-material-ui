import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CategoriesTable from './CategoriesTable';

export default function Router() {
  return (
    <Switch>
      <Route path="/categories" component={CategoriesTable} />
    </Switch>
  );
}
