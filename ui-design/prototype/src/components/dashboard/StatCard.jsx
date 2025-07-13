import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Avatar,
  useTheme
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import * as Icons from '@mui/icons-material';

const StatCard = ({ 
  label, 
  value, 
  change, 
  changeLabel = "from last period", 
  icon, 
  suffix = "", 
  ...props 
}) => {
  const theme = useTheme();
  
  // Determine if change is positive or negative
  const isPositive = change >= 0;
  const changeColor = isPositive ? theme.palette.success.main : theme.palette.error.main;
  const ChangeIcon = isPositive ? ArrowUpwardIcon : ArrowDownwardIcon;
  
  // Dynamically import icon from Material UI
  const IconComponent = Icons[icon] || Icons.Assessment;

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 2,
        boxShadow: theme.shadows[2],
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
        ...props.sx
      }}
      {...props}
    >
      <CardContent sx={{ padding: 3, pb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="subtitle1" color="text.secondary" fontWeight={500}>
            {label}
          </Typography>
          <Avatar 
            sx={{ 
              bgcolor: `${theme.palette.primary.main}15`, 
              color: theme.palette.primary.main 
            }}
          >
            <IconComponent />
          </Avatar>
        </Box>
        
        <Typography variant="h4" component="div" fontWeight={600} sx={{ mb: 1 }}>
          {typeof value === 'number' ? value.toLocaleString() : value}
          {suffix && <Typography component="span" variant="h5" color="text.secondary">{suffix}</Typography>}
        </Typography>
        
        {change !== undefined && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <ChangeIcon 
              sx={{ 
                color: changeColor,
                fontSize: '1rem',
                mr: 0.5
              }} 
            />
            <Typography 
              variant="body2" 
              sx={{ 
                color: changeColor,
                fontWeight: 500,
                mr: 1
              }}
            >
              {Math.abs(change)}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {changeLabel}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
