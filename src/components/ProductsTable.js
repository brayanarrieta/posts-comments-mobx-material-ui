import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button, Grid, Typography } from '@material-ui/core';
import AddProductDialog from './AddProductDialog';

const useStyles = makeStyles({
  container: {
    maxHeight: 440,
  },
});

const ProductsTable = (props) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    ProductsStore: {
      products, productsCount,
    },
    CategoriesStore: {
      getNameByCategoryId,
    },
  } = props;
  const columns = [
    { label: 'Name', id: 'name' },
    { label: 'Description', id: 'description' },
    { label: 'Price', id: 'price' },
    { label: 'Stock', id: 'stock' },
    { label: 'Category', id: 'categoryId', format: (value) => (getNameByCategoryId(value)) },
  ];

  const handleChangeIsModalOpen = (open) => setIsModalOpen(open);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Grid container>
      <AddProductDialog
        isModalOpen={isModalOpen}
        handleChangeIsModalOpen={handleChangeIsModalOpen}
      />
      <Grid
        item
        xs={12}
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Typography variant="h4">
          Products
        </Typography>
        <Button data-testid="button-add-new-product" variant="contained" color="primary" onClick={() => handleChangeIsModalOpen(true)}>
          Add new product
        </Button>
      </Grid>

      <Grid
        item
        xs={12}
      >
        <Paper>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={productsCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>


    </Grid>
  );
};

ProductsTable.propTypes = {
  ProductsStore: PropTypes.shape({
    products: PropTypes.array.isRequired,
    productsCount: PropTypes.number.isRequired,
  }).isRequired,
  CategoriesStore: PropTypes.shape({
    getNameByCategoryId: PropTypes.func.isRequired,
  }).isRequired,
};

export default inject((stores) => ({
  ProductsStore: stores.ProductsStore,
  CategoriesStore: stores.CategoriesStore,
}))(observer(ProductsTable));
