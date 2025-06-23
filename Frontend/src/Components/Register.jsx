import React, { useState } from 'react';
import {
  Button, TextField, Typography, Container, Box, Alert, CircularProgress
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ userName: '',email:'', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    console.log("Submit",form)
    try {
      const data =await axios.post('http://localhost:9092/auth/register', form);
      console.log("Data ",data)
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={10} p={3} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" align="center" gutterBottom>Register</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="userName"
            value={form.userName}
            onChange={handleChange}
            fullWidth margin="normal" required
          />
          <TextField
            label="Email"
            name="email"
            type='email'
            value={form.email}
            onChange={handleChange}
            fullWidth margin="normal" required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth margin="normal" required
          />
          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Register'}
            </Button>
          </Box>
          <Box mt={2}>
            <Typography variant="body2" align="center">
              Already have an account? <a href="/">Login</a>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
