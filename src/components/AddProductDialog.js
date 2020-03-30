import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

const AddProductDialog = ({
  handleChangeIsModalOpen,
  isModalOpen,
  ProductsStore: { addProduct },
  CategoriesStore: { categories },
}) => {
  const [state, setState] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    addProduct(state);
    handleChangeIsModalOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => handleChangeIsModalOpen(false)}
      aria-labelledby="add-product-form-dialog-title"
      fullWidth
    >
      <form noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
        <DialogTitle id="add-product-form-dialog-title">Add new Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={state.name}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={state.description}
            onChange={handleChange}
          />
          <FormControl style={{ minWidth: '100%' }}>
            <InputLabel id="categories-select-label">Category</InputLabel>
            <Select
              labelId="categories-select-label"
              id="categories-select"
              name="categoryId"
              value={state.categoryId || ''}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.name} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="price"
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={state.price}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="stock"
            name="stock"
            label="stock"
            type="number"
            fullWidth
            value={state.stock}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleChangeIsModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

AddProductDialog.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  handleChangeIsModalOpen: PropTypes.func.isRequired,
  ProductsStore: PropTypes.shape({
    addProduct: PropTypes.func.isRequired,
  }).isRequired,
  CategoriesStore: PropTypes.shape({
    categories: PropTypes.array.isRequired,
  }).isRequired,
};

export default inject((stores) => ({
  ProductsStore: stores.ProductsStore,
  CategoriesStore: stores.CategoriesStore,
}))(observer(AddProductDialog));
