import React, { useState, useContext } from 'react';
import {
  Button, TextField, Typography, Container, Box, Alert, CircularProgress, Dialog, DialogTitle, DialogContent
} from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setDialogOpen(false);

    try {
      const res = await axios.post('http://localhost:9092/auth/login', form);
      console.log("Login ",res.data)
      localStorage.setItem('id', res.data.id);
      login(res.data.token);
    
      // Show success dialog
      setDialogOpen(true);
      setTimeout(() => {
        setDialogOpen(false);
        
        navigate('/dashboard');
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={10} p={3} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" align="center" gutterBottom>Login</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </Box>
          <Box mt={2}>
            <Typography variant="body2" align="center">
              Don't have an account? <a href="/register">Register</a>
            </Typography>
          </Box>
        </form>
      </Box>

      {/* Success Dialog */}
      <Dialog open={dialogOpen} maxWidth="xs" fullWidth>
        <DialogTitle>Login Successful</DialogTitle>
        <DialogContent sx={{ textAlign: 'center', py: 2 }}>
          <Typography>Redirecting to dashboard...</Typography>
          <Box mt={2}>
            <CircularProgress size={28} />
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Login;
