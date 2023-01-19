import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  }
  return (
    <Box
      sx={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -60%)',
        textAlign: 'center'
      }}
    >
      <Typography variant="h1" style={{ color: '#4f4f4f', }} sx={{ mb: 2 }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: '#4f4f4f' }} sx={{ mb: 4 }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" onClick={handleClick}>Back Home</Button>
    </Box>
  );
}
export default NotFound;