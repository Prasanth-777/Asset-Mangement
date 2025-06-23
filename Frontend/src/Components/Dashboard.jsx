import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Button,
  Box
} from '@mui/material';
import AssetTable from '../Components/AssetTable';
import { getToken } from '../utils/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [assets, setAssets] = useState( [
    {
      id: 1,
      assetName: "MacBook Air",
      categoryName: "Laptop",
      statusName: "Active",
      purchaseDate: "2022-01-15",
      warrantyExpiryDate: "2024-01-15",
      imageUrl: "https://example.com/macbook.jpg"
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(3);
  const navigate = useNavigate();

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/assets?page=${page}&size=5`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setAssets(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Error fetching assets', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAssets();
  }, [page]);

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" mt={10}>
        <Typography variant="h5">My Assets</Typography>
        <Button variant="contained" onClick={() => navigate('/add-asset')}>Add Asset</Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>
      ) : (
        <AssetTable
          assets={assets}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}
    </Container>
  );
}
