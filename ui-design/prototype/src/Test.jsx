import React, { useState } from 'react';
import { Button, Typography, Box, Paper } from '@mui/material';

/**
 * A minimal test component to verify React rendering works correctly
 * This component has minimal dependencies and should render even if other parts fail
 */
function Test() {
  const [count, setCount] = useState(0);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center', 
      minHeight: '100vh',
      bgcolor: '#121212'
    }}>
      <Paper sx={{ 
        p: 4, 
        maxWidth: 500, 
        textAlign: 'center',
        bgcolor: '#1e1e1e',
        color: 'white',
        borderRadius: 2
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          PlexifyAEC Test Component
        </Typography>
        
        <Typography variant="body1" paragraph>
          If you can see this text, React is rendering correctly.
        </Typography>
        
        <Typography variant="body1" paragraph>
          Count: {count}
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setCount(count + 1)}
          sx={{ m: 1 }}
        >
          Increment Count
        </Button>
        
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={() => setCount(0)}
          sx={{ m: 1 }}
        >
          Reset Count
        </Button>
      </Paper>
    </Box>
  );
}

export default Test;
