import React, { useState } from 'react';
import MaterialTable from 'material-table';

const columns = [
  { title: 'Name', field: 'name' },
  { title: 'Surname', field: 'surname' },
  { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
  {
    title: 'Birth Place',
    field: 'birthCity',
    lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
  },
];

const defaultData = [
  {
    name: 'Mehmet',
    surname: 'Baran',
    birthYear: 1987,
    birthCity: 63,
  },
  {
    name: 'Zerya Betül',
    surname: 'Baran',
    birthYear: 2017,
    birthCity: 34,
  },
];

const CategoriesTable = () => {
  const [data, setData] = useState(defaultData);

  return (
    <MaterialTable
      title="Categories"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: (newData) => new Promise((resolve) => {
          resolve();
          setData((prevData) => ([...prevData, newData]));
        }),
        onRowUpdate: (newData, oldData) => new Promise((resolve) => {
          resolve();
          if (oldData) {
            setData((prevData) => {
              const rows = prevData;
              const index = rows.indexOf(oldData);
              rows[index] = newData;
              return rows;
            });
          }
        }),
        onRowDelete: (oldData) => new Promise((resolve) => {
          setData((prevData) => {
            const rows = prevData;
            const index = rows.indexOf(oldData);
            return rows.splice(index, 1);
          });
          resolve();
        }),
      }}
    />
  );
};

export default CategoriesTable;
