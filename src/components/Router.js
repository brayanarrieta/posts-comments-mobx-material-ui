import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CategoriesList from './CategoriesList';

export default function Router() {
  return (
    <Switch>
      <Route path="/categories" component={CategoriesList} />
    </Switch>
  );
}
