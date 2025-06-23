import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AssetForm from '../Components/AssetForm.jsx';
import { getToken } from '../utils/auth';

export default function EditAssetPage() {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    const fetchAsset = async () => {
      const res = await axios.get(`/api/assets/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setAsset(res.data);
    };
    fetchAsset();
  }, [id]);

  if (!asset) return <div>Loading...</div>;

  return <AssetForm assetToEdit={asset} />;
}
