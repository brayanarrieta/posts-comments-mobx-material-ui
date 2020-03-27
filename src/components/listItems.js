import React from 'react';
import {
  ListItem, ListItemIcon, ListItemText, ListSubheader,
} from '@material-ui/core';
import {
  Dashboard, ShoppingCart, People, BarChart, Layers, Assignment,
} from '@material-ui/icons';

const generateMenuItems = (itemList) => itemList.map(({ Icon, text }) => (
  <ListItem button key={`menu-item-${text}`}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
));

const mainListOptions = [
  { Icon: Dashboard, text: 'Dashboard' },
  { Icon: ShoppingCart, text: 'Orders' },
  { Icon: People, text: 'Customers' },
  { Icon: BarChart, text: 'Reports' },
  { Icon: Layers, text: 'Integrations' },
];

const secondaryListOptions = [
  { Icon: Assignment, text: 'Current month' },
  { Icon: Assignment, text: 'Last quarter' },
  { Icon: Assignment, text: 'Year-end sale' },
];

export const mainListItems = generateMenuItems(mainListOptions);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <div>
      {generateMenuItems(secondaryListOptions)}
    </div>
  </div>
);
