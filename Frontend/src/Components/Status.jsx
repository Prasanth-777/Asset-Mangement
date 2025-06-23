import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, Paper, IconButton,
  List, ListItem, ListItemText, ListItemSecondaryAction, Divider, Snackbar, Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { getToken } from '../utils/auth';

export default function Status() {
  const [statuses, setStatuses] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const fetchStatuses = async () => {
    try {
      const res = await axios.get('http://localhost:9092/asset-status', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setStatuses(res.data);
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to load statuses', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim()) return;
    try {
      if (editingId) {
        await axios.put('http://localhost:9092/asset-status', { id: editingId, name }, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        setSnackbar({ open: true, message: 'Status updated', severity: 'success' });
      } else {
        await axios.post('http://localhost:9092/asset-status', { name }, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        setSnackbar({ open: true, message: 'Status created', severity: 'success' });
      }
      setName('');
      setEditingId(null);
      fetchStatuses();
    } catch (err) {
      setSnackbar({ open: true, message: 'Save failed', severity: 'error' });
    }
  };

  const handleEdit = (status) => {
    setEditingId(status.id);
    setName(status.name);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this status?')) return;
    try {
      await axios.delete(`http://localhost:9092/asset-status/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setSnackbar({ open: true, message: 'Status deleted', severity: 'success' });
      fetchStatuses();
    } catch (err) {
      setSnackbar({ open: true, message: 'Delete failed', severity: 'error' });
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt:12  }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {editingId ? 'Edit Status' : 'Add New Status'}
        </Typography>
        <TextField
          label="Status Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          size="small"
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" onClick={handleSubmit}>
            {editingId ? 'Update' : 'Create'}
          </Button>
          {editingId && (
            <Button variant="text" color="secondary" onClick={() => {
              setEditingId(null);
              setName('');
            }}>
              Cancel
            </Button>
          )}
        </Box>
      </Paper>

      <Paper sx={{ mt: 4, p: 2 }}>
        <Typography variant="h6" gutterBottom>Existing Statuses</Typography>
        <List>
          {statuses.map((stat) => (
            <React.Fragment key={stat.id}>
              <ListItem>
                <ListItemText primary={stat.name} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleEdit(stat)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(stat.id)}><DeleteIcon /></IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
