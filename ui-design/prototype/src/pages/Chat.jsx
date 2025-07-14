import { useState } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Drawer, 
  IconButton, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ChatInterface from '../components/chat/ChatInterface';
import ComplianceSidebar from '../components/compliance/ComplianceSidebar';
import useStore from '../context/store';

const Chat = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { chat: { conversations, currentConversationId } } = useStore();
  
  // Get current conversation
  const currentConversation = conversations.find(c => c.id === currentConversationId) || conversations[0];

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Mobile header with toggle button */}
      {isMobile && (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            p: 1, 
            borderBottom: `1px solid ${theme.palette.divider}` 
          }}
        >
          <Typography variant="h6">
            {currentConversation?.title || 'Chat'}
          </Typography>
          <IconButton onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      {/* Main content */}
      <Grid container sx={{ flexGrow: 1, height: isMobile ? 'calc(100% - 48px)' : '100%' }}>
        {/* Chat interface */}
        <Grid 
          item 
          xs={12} 
          md={sidebarOpen ? 8 : 12} 
          lg={sidebarOpen ? 9 : 12}
          sx={{ 
            height: '100%',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Paper 
            elevation={0} 
            sx={{ 
              height: '100%', 
              borderRadius: 0,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Desktop conversation title */}
            {!isMobile && (
              <Box 
                sx={{ 
                  p: 2, 
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h6">
                  {currentConversation?.title || 'Chat'}
                </Typography>
                {!sidebarOpen && (
                  <IconButton onClick={toggleSidebar} color="primary">
                    <MenuIcon />
                  </IconButton>
                )}
              </Box>
            )}
            
            {/* Chat interface component */}
            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
              <ChatInterface />
            </Box>
          </Paper>
        </Grid>

        {/* Compliance sidebar - desktop version */}
        {!isMobile && (
          <Grid 
            item 
            md={4} 
            lg={3} 
            sx={{ 
              height: '100%',
              display: sidebarOpen ? 'block' : 'none',
              borderLeft: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Paper 
              elevation={0} 
              sx={{ 
                height: '100%', 
                borderRadius: 0,
                position: 'relative'
              }}
            >
              <Box 
                sx={{ 
                  p: 2, 
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h6">
                  Compliance
                </Typography>
                <IconButton onClick={toggleSidebar}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box sx={{ height: 'calc(100% - 64px)', overflow: 'auto' }}>
                <ComplianceSidebar />
              </Box>
            </Paper>
          </Grid>
        )}

        {/* Compliance sidebar - mobile drawer version */}
        {isMobile && (
          <Drawer
            anchor="right"
            open={sidebarOpen}
            onClose={toggleSidebar}
            sx={{
              '& .MuiDrawer-paper': {
                width: '80%',
                maxWidth: 360,
                boxSizing: 'border-box',
              },
            }}
          >
            <Box 
              sx={{ 
                p: 2, 
                borderBottom: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="h6">
                Compliance
              </Typography>
              <IconButton onClick={toggleSidebar}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ height: 'calc(100% - 64px)', overflow: 'auto' }}>
              <ComplianceSidebar />
            </Box>
          </Drawer>
        )}
      </Grid>
    </Box>
  );
};

export default Chat;
