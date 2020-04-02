import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import isEmptyObject from '../../helpers';
import { FORM_ERROR_MESSAGES, DEFAULT_FORM_VALUES } from './constants';

const AddProductDialog = ({
  handleChangeIsModalOpen,
  isModalOpen,
  ProductsStore: { addProduct },
  CategoriesStore: { categories },
}) => {
  const [state, setState] = useState(DEFAULT_FORM_VALUES);
  const [errors, setErrors] = useState({});

  const isValidForm = () => {
    const {
      name, description, stock, price, categoryId,
    } = state;
    const errorValidations = {};

    if (!name) {
      errorValidations.name = FORM_ERROR_MESSAGES.NAME_REQUIRED;
    }
    if (!description) {
      errorValidations.description = FORM_ERROR_MESSAGES.DESCRIPTION_REQUIRED;
    }
    if (stock < 0) {
      errorValidations.stock = FORM_ERROR_MESSAGES.STOCK_INVALID;
    }
    if (price < 0) {
      errorValidations.price = FORM_ERROR_MESSAGES.PRICE_INVALID;
    }
    if (!categoryId) {
      errorValidations.categoryId = FORM_ERROR_MESSAGES.CATEGORY_ID_REQUIRED;
    }

    setErrors(errorValidations);
    return !!isEmptyObject(errorValidations);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValidForm()) {
      return;
    }
    addProduct(state);
    handleChangeIsModalOpen(false);
    setState(DEFAULT_FORM_VALUES);
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
        <DialogTitle id="add-product-form-dialog-title">Add Product</DialogTitle>
        <DialogContent>
          <TextField
            error={!!errors.name}
            required
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={state.name}
            onChange={handleChange}
            helperText={errors.name}
          />
          <TextField
            error={!!errors.description}
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={state.description}
            onChange={handleChange}
            helperText={errors.description}
          />
          <TextField
            error={!!errors.categoryId}
            required
            margin="dense"
            select
            fullWidth
            label="Category"
            id="categories-select"
            data-testid="categories-select"
            name="categoryId"
            value={state.categoryId}
            onChange={handleChange}
            helperText={errors.categoryId}
          >
            {categories.map((category) => (
              <MenuItem key={category.name} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            error={!!errors.price}
            margin="dense"
            id="price"
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={state.price}
            onChange={handleChange}
            helperText={errors.price}
          />
          <TextField
            error={!!errors.stock}
            margin="dense"
            id="stock"
            name="stock"
            label="stock"
            type="number"
            fullWidth
            value={state.stock}
            onChange={handleChange}
            helperText={errors.stock}
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
