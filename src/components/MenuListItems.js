import React from 'react';
import {
  ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import {
  Assignment, Category, List,
} from '@material-ui/icons';

const generateMenuItems = (itemList) => itemList.map(({ Icon, text }) => (
  <ListItem button key={`menu-item-${text}`}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
));

const options = [
  { Icon: Assignment, text: 'Orders' },
  { Icon: List, text: 'Products' },
  { Icon: Category, text: 'Categories' },
];

const MenuListItems = () => generateMenuItems(options);

export default MenuListItems;
