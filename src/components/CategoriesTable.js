import React from 'react';
import { inject, observer } from 'mobx-react';
import Paper from '@material-ui/core/Paper';
import { EditingState } from '@devexpress/dx-react-grid';
import {
  Grid as TableGrid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';

const columns = [
  { title: 'Name', name: 'name' },
  { title: 'Description', name: 'description' },
];

const getRowId = (row) => row.id;

const CategoriesTable = (props) => {
  const {
    CategoriesStore: {
      categories, addCategory, updateCategory, deleteCategory,
    },
  } = props;

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      added.map((row) => (addCategory(row)));
    }

    if (changed) {
      updateCategory(changed);
    }

    if (deleted) {
      deleteCategory(deleted);
    }
  };
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Typography variant="h4">
          Categories
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <TableGrid
            rows={categories}
            columns={columns}
            getRowId={getRowId}
          >
            <EditingState
              onCommitChanges={commitChanges}
            />
            <Table />
            <TableHeaderRow />
            <TableEditRow />
            <TableEditColumn
              showAddCommand
              showEditCommand
              showDeleteCommand
            />
          </TableGrid>
        </Paper>
      </Grid>
    </Grid>
  );
};

CategoriesTable.propTypes = {
  CategoriesStore: PropTypes.shape({
    categories: PropTypes.array.isRequired,
    addCategory: PropTypes.func.isRequired,
    updateCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
  }).isRequired,
};

export default inject('CategoriesStore')(observer(CategoriesTable));
