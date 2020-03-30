import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const AddProductDialog = ({ handleChangeIsModalOpen, isModalOpen }) => (
  <Dialog open={isModalOpen} onClose={() => handleChangeIsModalOpen(false)} aria-labelledby="add-product-form-dialog-title" fullWidth="md">
    <DialogTitle id="add-product-form-dialog-title">Add new Product</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Email Address"
        type="email"
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => handleChangeIsModalOpen(false)} color="primary">
        Cancel
      </Button>
      <Button onClick={() => handleChangeIsModalOpen(false)} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

AddProductDialog.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  handleChangeIsModalOpen: PropTypes.func.isRequired,
};

export default AddProductDialog;
