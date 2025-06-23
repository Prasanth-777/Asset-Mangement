import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Grid,
  Typography,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';
import { getToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function AssetForm({ assetToEdit }) {
  const [form, setForm] = useState({
    assetName: '',
    categoryId: '',
    statusId: '',
    purchaseDate: '',
    warrantyExpiryDate: '',
    imageUrl: ''
  });

  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const navigate = useNavigate();
  const isEditMode = !!assetToEdit;

  // Fetch categories and statuses
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [catRes, statRes] = await Promise.all([
          axios.get('http://localhost:9092/asset-category', { headers: { Authorization: `Bearer ${getToken()}` } }),

          axios.get('http://localhost:9092/asset-status', { headers: { Authorization: `Bearer ${getToken()}` } })

          
        ]);
        
        setCategories(Array.isArray(catRes.data) ? catRes.data : []);
        setStatuses(Array.isArray(statRes.data) ? statRes.data : []);
      } catch (err) {
        setSnackbar({ open: true, message: 'Failed to load dropdowns', severity: 'error' });
      }
    };

    fetchDropdowns();
  }, []);

  // If editing, prefill form
  useEffect(() => {
    if (isEditMode && assetToEdit) {
      setForm({
        assetName: assetToEdit.assetName || '',
        categoryId: assetToEdit.categoryId || '',
        statusId: assetToEdit.statusId || '',
        purchaseDate: assetToEdit.purchaseDate || '',
        warrantyExpiryDate: assetToEdit.warrantyExpiryDate || '',
        imageUrl: assetToEdit.imageUrl || ''
      });
    }
  }, [assetToEdit]);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:9092/assets/${assetToEdit.id}`, form, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        setSnackbar({ open: true, message: 'Asset updated successfully', severity: 'success' });
      } else {
        console.log(form);
        const userId=localStorage.getItem('id')
        await axios.post('http://localhost:9092/assets', {...form,userId}, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        setSnackbar({ open: true, message: 'Asset added successfully', severity: 'success' });
      }
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err) {
      setSnackbar({ open: true, message: 'Something went wrong', severity: 'error' });
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 12 }}>
      <Typography variant="h5" gutterBottom>
        {isEditMode ? 'Edit Asset' : 'Add Asset'}
      </Typography>

      <Grid container spacing={2}  direction="column">
  <Grid item xs={12}>
    <TextField
      label="Asset Name"
      fullWidth
      size="small"
      value={form.assetName}
      onChange={handleChange('assetName')}
    />
  </Grid>

  <Grid item xs={12}>
    <TextField
      select
      label="Category"
      fullWidth
      size="small"
      value={form.categoryId}
      onChange={handleChange('categoryId')}
    >
      {categories.length === 0 ? (
        <MenuItem disabled>Loading...</MenuItem>
      ) : (
        categories.map((cat) => (
          <MenuItem key={cat.id} value={cat.id}>
            {cat.name}
          </MenuItem>
        ))
      )}
    </TextField>
  </Grid>

  <Grid item xs={12}>
    <TextField
      select
      label="Status"
      fullWidth
      size="small"
      value={form.statusId}
      onChange={handleChange('statusId')}
    >
      {statuses.length === 0 ? (
        <MenuItem disabled>Loading...</MenuItem>
      ) : (
        statuses.map((stat) => (
          <MenuItem key={stat.id} value={stat.id}>
            {stat.name}
          </MenuItem>
        ))
      )}
    </TextField>
  </Grid>

  <Grid item xs={12}>

    <TextField
  type="datetime-local"
  label="Purchase Date"
  InputLabelProps={{ shrink: true }}
  size='small'
  value={form.purchaseDate}
  onChange={handleChange('purchaseDate')}
  fullWidth
/>

  </Grid>

  <Grid item xs={12}>
    <TextField
      type="datetime-local"
      label="Warranty Expiry Date"
      fullWidth
      size="small"
      InputLabelProps={{ shrink: true }}
      value={form.warrantyExpiryDate}
      onChange={handleChange('warrantyExpiryDate')}
    />
  </Grid>

  <Grid item xs={12}>
    <TextField
      label="Image URL"
      fullWidth
      size="small"
      value={form.imageUrl}
      onChange={handleChange('imageUrl')}
    />
  </Grid>

  <Grid item xs={12} textAlign="right">
    <Button
      variant="contained"
      color="primary"
      disabled={loading}
      onClick={handleSubmit}
    >
      {loading ? <CircularProgress size={24} /> : isEditMode ? 'Update Asset' : 'Add Asset'}
    </Button>
  </Grid>
</Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
