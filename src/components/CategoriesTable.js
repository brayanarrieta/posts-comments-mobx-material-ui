import React, { useState } from 'react';
import MaterialTable from 'material-table';

const columns = [
  { title: 'Name', field: 'name' },
  { title: 'Description', field: 'description' },
];

const CategoriesTable = () => {
  const [state, setState] = useState({
    columns,
    data: [],
  });

  return (
    <MaterialTable
      title="Categories"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) => new Promise((resolve) => {
          resolve();
          setState((prevState) => {
            const data = [...prevState.data, newData];
            return { ...prevState, data };
          });
        }),
        onRowUpdate: (newData, oldData) => new Promise((resolve) => {
          resolve();
          if (oldData) {
            setState((prevState) => {
              const data = [...prevState.data];
              data[data.indexOf(oldData)] = newData;
              return { ...prevState, data };
            });
          }
        }),
        onRowDelete: (oldData) => new Promise((resolve) => {
          resolve();
          setState((prevState) => {
            const data = [...prevState.data];
            data.splice(data.indexOf(oldData), 1);
            return { ...prevState, data };
          });
        }),
      }}
    />
  );
};

export default CategoriesTable;
