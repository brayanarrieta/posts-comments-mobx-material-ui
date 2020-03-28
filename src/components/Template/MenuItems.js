import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {
  Assignment, Category, List, Dashboard,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

const generateMenuItems = (itemList) => itemList.map(({ Icon, text, route }) => (

  <ListItem button key={`menu-item-${text}`} to={route} component={Link}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
));

const options = [
  { Icon: Dashboard, text: 'Dashboard', route: '/dashboard' },
  { Icon: Assignment, text: 'Orders', route: '/orders' },
  { Icon: List, text: 'Products', route: '/products' },
  { Icon: Category, text: 'Categories', route: '/categories' },
];

const MenuListItems = () => generateMenuItems(options);

export default MenuListItems;
