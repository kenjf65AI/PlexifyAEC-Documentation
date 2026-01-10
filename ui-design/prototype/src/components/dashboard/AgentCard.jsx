import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Avatar,
  Divider,
  Chip,
  useTheme,
  Grid
} from '@mui/material';
// Explicit icon imports to avoid runtime failures with dynamic lookup
import DescriptionIcon from '@mui/icons-material/Description';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const AgentCard = ({ 
  title, 
  description, 
  icon, 
  color, 
  metrics,
  ...props 
}) => {
  const theme = useTheme();
  
  // Map supported icon names to their components
  const iconMap = {
    Description: DescriptionIcon,
    FactCheck:   FactCheckIcon,
    Schedule:    ScheduleIcon,
    AttachMoney: AttachMoneyIcon,
    SmartToy:    SmartToyIcon
  };

  const IconComponent = iconMap[icon] || SmartToyIcon;

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: theme.shadows[3],
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[10],
        },
        ...props.sx
      }}
      {...props}
    >
      <CardContent sx={{ padding: 3, pb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: `${color}20`, 
              color: color,
              width: 48,
              height: 48,
              mr: 2
            }}
          >
            <IconComponent />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {title}
            </Typography>
            <Chip 
              label={`${metrics.accuracy}% Accuracy`} 
              size="small" 
              sx={{ 
                bgcolor: `${theme.palette.success.main}20`, 
                color: theme.palette.success.main,
                fontWeight: 500,
                mt: 0.5
              }} 
            />
          </Box>
        </Box>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            minHeight: '2.5rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {description}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2}>
          {Object.entries(metrics).map(([key, value], index) => {
            if (key === 'accuracy') return null; // Skip accuracy as it's already displayed
            
            // Format the metric key for display
            const formattedKey = key
              .replace(/([A-Z])/g, ' $1') // Add space before capital letters
              .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
              
            return (
              <Grid item xs={6} key={index}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {formattedKey}
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {value}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
