import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Footer() {
  return (
    <Box sx={{ p: 6 }} component="footer">
      <Typography variant="body2" color="text.secondary" align="center">
        {'© '}
        <Link
          color="inherit"
          component={RouterLink}
          to={`${process.env.PUBLIC_URL}/`}
        >
          {process.env['REACT_APP_NAME']}
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
}

export default Footer;
