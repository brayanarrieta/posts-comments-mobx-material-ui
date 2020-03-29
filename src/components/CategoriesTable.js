import React from 'react';
import MaterialTable from 'material-table';
import { inject, observer } from 'mobx-react';

const columns = [
  { title: 'Name', field: 'name' },
  { title: 'Description', field: 'description' },
];

const CategoriesTable = ({ CategoriesStore }) => {
  const {
    categories, addCategory, updateCategory, deleteCategory,
  } = CategoriesStore;
  return (
    <MaterialTable
      title="Categories"
      columns={columns}
      data={categories}
      editable={{
        onRowAdd: (newData) => Promise.resolve(addCategory(newData)),
        onRowUpdate: (newData, oldData) => Promise.resolve(updateCategory(newData, oldData)),
        onRowDelete: (oldData) => Promise.resolve(deleteCategory(oldData)),
      }}
    />
  );
};

export default inject('CategoriesStore')(observer(CategoriesTable));
