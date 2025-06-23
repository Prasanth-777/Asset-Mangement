import React, { useContext, useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Button, Box,
  Drawer, List, ListItem, ListItemButton, ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <AppBar position="fixed" >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Personal Asset Manager</Typography>

          {/* Desktop Buttons */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/add-asset">
              Add Asset
            </Button>
            <Button color="inherit" component={Link} to="/category">
              Category
            </Button>
            <Button color="inherit" component={Link} to="/status">
              Status
            </Button>
            <Button
              color="warning"
              variant="contained"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <List sx={{ width: 200 }}>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard" onClick={toggleDrawer}>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/add-asset" onClick={toggleDrawer}>
              <ListItemText primary="Add Asset" />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/category" onClick={toggleDrawer}>
              <ListItemText primary="Category" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/status" onClick={toggleDrawer}>
              <ListItemText primary="Status" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleLogout();
                toggleDrawer();
              }}
              sx={{ color: 'warning.main' }} 
              variant=""
            >
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
