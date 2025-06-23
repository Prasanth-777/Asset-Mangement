import React, { useEffect, useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper,
  TablePagination, Button, CircularProgress, Snackbar, Alert
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';

const sampleAssets = [
  {
    id: 1,
    assetName: 'MacBook Pro',
    categoryName: 'Laptop',
    statusName: 'Active',
    purchaseDate: '2023-01-10',
    warrantyExpiryDate: '2026-01-10',
  },
  {
    id: 2,
    assetName: 'iPhone 13',
    categoryName: 'Phone',
    statusName: 'Active',
    purchaseDate: '2022-08-01',
    warrantyExpiryDate: '2024-08-01',
  },
  {
    id: 3,
    assetName: 'Bajaj Pulsar',
    categoryName: 'Bike',
    statusName: 'Sold',
    purchaseDate: '2020-03-15',
    warrantyExpiryDate: null,
  },
   {
    id: 2,
    assetName: 'iPhone 13',
    categoryName: 'Phone',
    statusName: 'Active',
    purchaseDate: '2022-08-01',
    warrantyExpiryDate: '2024-08-01',
  },
  {
    id: 3,
    assetName: 'Bajaj Pulsar',
    categoryName: 'Bike',
    statusName: 'Sold',
    purchaseDate: '2020-03-15',
    warrantyExpiryDate: null,
  },
   {
    id: 2,
    assetName: 'iPhone 13',
    categoryName: 'Phone',
    statusName: 'Active',
    purchaseDate: '2022-08-01',
    warrantyExpiryDate: '2024-08-01',
  },
  {
    id: 3,
    assetName: 'Bajaj Pulsar',
    categoryName: 'Bike',
    statusName: 'Sold',
    purchaseDate: '2020-03-15',
    warrantyExpiryDate: null,
  },
   {
    id: 2,
    assetName: 'iPhone 13',
    categoryName: 'Phone',
    statusName: 'Active',
    purchaseDate: '2022-08-01',
    warrantyExpiryDate: '2024-08-01',
  },
  {
    id: 3,
    assetName: 'Bajaj Pulsar',
    categoryName: 'Bike',
    statusName: 'Sold',
    purchaseDate: '2020-03-15',
    warrantyExpiryDate: null,
  },
   {
    id: 2,
    assetName: 'iPhone 13',
    categoryName: 'Phone',
    statusName: 'Active',
    purchaseDate: '2022-08-01',
    warrantyExpiryDate: '2024-08-01',
  },
  {
    id: 3,
    assetName: 'Bajaj Pulsar',
    categoryName: 'Bike',
    statusName: 'Sold',
    purchaseDate: '2020-03-15',
    warrantyExpiryDate: null,
  },
];

export default function AssetTable() {
  const [assets, setAssets] = useState([]); // ✅ always an array
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/assets?page=${page}&size=${rowsPerPage}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      const data = res.data.content || res.data;

      if (Array.isArray(data)) {
        setAssets(data);
      } else {
        console.warn('Unexpected API response, using dummy data:', res.data);
        setAssets(sampleAssets); // fallback to dummy
        setSnackbar({ open: true, message: 'Using sample data (invalid API response)', severity: 'warning' });
      }

    } catch (err) {
      setAssets(sampleAssets); // fallback to dummy
      setSnackbar({ open: true, message: 'Failed to fetch assets, showing dummy data.', severity: 'warning' });
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/assets/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setSnackbar({ open: true, message: 'Asset deleted successfully', severity: 'success' });
      fetchAssets(); // refresh
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to delete asset', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [page, rowsPerPage]);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead >
            <TableRow  sx={{ '& th': { fontWeight: 'bold',fontSize:"15px" } }}>
              <TableCell >Asset Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Purchase Date</TableCell>
              <TableCell>Warranty Expiry</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {assets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">No assets found.</TableCell>
              </TableRow>
            ) : (
              assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.assetName}</TableCell>
                  <TableCell>{asset.category?.name || asset.categoryName}</TableCell>
                  <TableCell>{asset.status?.name || asset.statusName}</TableCell>
                  <TableCell>{asset.purchaseDate}</TableCell>
                  <TableCell>{asset.warrantyExpiryDate || 'N/A'}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => navigate(`/edit-asset/${asset.id}`)}>
                      Edit
                    </Button>
                    <Button size="small" color="error" onClick={() => handleDelete(asset.id)}>
                      Delete
                    </Button>
                    
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={assets.length < rowsPerPage ? assets.length : 100} // fake total
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Assets per page"
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </TableContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
}
