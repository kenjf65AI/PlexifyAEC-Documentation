import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Grid, 
  Divider, 
  Tooltip, 
  Alert,
  useTheme,
  Avatar
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import SyncIcon from '@mui/icons-material/Sync';
import InfoIcon from '@mui/icons-material/Info';
// NOTE: We no longer rely on date-fns.  All date formatting is done with the
// built-in Intl APIs so that we avoid an extra bundle dependency.

const IntegrationStatus = ({ integrations = [], ...props }) => {
  const theme = useTheme();

  // Status configuration
  const statusConfig = {
    connected: {
      color: theme.palette.success.main,
      icon: CheckCircleIcon,
      label: 'Connected'
    },
    degraded: {
      color: theme.palette.warning.main,
      icon: WarningIcon,
      label: 'Degraded'
    },
    disconnected: {
      color: theme.palette.error.main,
      icon: ErrorIcon,
      label: 'Disconnected'
    },
    scheduled: {
      color: theme.palette.info.main,
      icon: PendingIcon,
      label: 'Scheduled'
    }
  };

  // Format date from ISO string
  const formatDate = (isoString) => {
    if (!isoString) return 'Never';
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return 'Invalid date';
    const formatter = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return formatter.format(date);
  };

  // Format relative time (e.g., "2 hours ago")
  const formatRelativeTime = (isoString) => {
    if (!isoString) return 'Never synced';
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return 'Unknown';

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const diffMs = date.getTime() - Date.now();
    const diffSec = Math.round(diffMs / 1000);

    const divisions = [
      { amount: 60, unit: 'seconds' },
      { amount: 60, unit: 'minutes' },
      { amount: 24, unit: 'hours' },
      { amount: 7, unit: 'days' },
      { amount: 4.34524, unit: 'weeks' },
      { amount: 12, unit: 'months' },
      { amount: Infinity, unit: 'years' },
    ];

    let unit = 'seconds';
    let value = diffSec;
    for (const division of divisions) {
      if (Math.abs(value) < division.amount) {
        unit = division.unit;
        break;
      }
      value = Math.round(value / division.amount);
    }

    return rtf.format(value, unit);
  };

  return (
    <Card 
      sx={{ 
        borderRadius: 2,
        boxShadow: theme.shadows[2],
        ...props.sx
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Integration Status
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Current status of external system integrations
        </Typography>
        
        <Grid container spacing={2}>
          {integrations.map((integration) => {
            const status = statusConfig[integration.status] || statusConfig.disconnected;
            const StatusIcon = status.icon;
            
            return (
              <Grid item xs={12} md={6} lg={4} key={integration.id}>
                <Card 
                  sx={{ 
                    borderRadius: 2,
                    boxShadow: theme.shadows[1],
                    borderLeft: `4px solid ${status.color}`,
                    height: '100%',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[4],
                    }
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    {/* Integration header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: `${status.color}15`,
                          color: status.color,
                          width: 40,
                          height: 40,
                          mr: 1.5
                        }}
                      >
                        <StatusIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {integration.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {integration.type}
                        </Typography>
                      </Box>
                    </Box>
                    
                    {/* Status chip */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Chip 
                        label={status.label} 
                        size="small"
                        sx={{ 
                          bgcolor: `${status.color}15`,
                          color: status.color,
                          fontWeight: 500
                        }}
                      />
                      
                      {integration.lastSync && (
                        <Tooltip title={formatDate(integration.lastSync)}>
                          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                            <SyncIcon 
                              sx={{ 
                                fontSize: '0.875rem', 
                                color: theme.palette.text.secondary,
                                mr: 0.5
                              }} 
                            />
                            <Typography variant="caption" color="text.secondary">
                              {formatRelativeTime(integration.lastSync)}
                            </Typography>
                          </Box>
                        </Tooltip>
                      )}
                    </Box>
                    
                    {/* Metrics */}
                    {integration.metrics && (
                      <Box sx={{ mt: 2 }}>
                        <Divider sx={{ mb: 1.5 }} />
                        <Grid container spacing={1}>
                          {Object.entries(integration.metrics).map(([key, value]) => {
                            // Format the metric key for display
                            const formattedKey = key
                              .replace(/([A-Z])/g, ' $1') // Add space before capital letters
                              .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
                              
                            return (
                              <Grid item xs={6} key={key}>
                                <Typography variant="caption" color="text.secondary" display="block">
                                  {formattedKey}
                                </Typography>
                                <Typography variant="body2" fontWeight={500}>
                                  {value}
                                </Typography>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Box>
                    )}
                    
                    {/* Alert message */}
                    {integration.alert && (
                      <Alert 
                        severity={integration.alert.severity || 'info'} 
                        sx={{ 
                          mt: 2, 
                          py: 0.5,
                          '& .MuiAlert-message': {
                            padding: '4px 0'
                          }
                        }}
                      >
                        <Typography variant="caption">
                          {integration.alert.message}
                        </Typography>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        
        {integrations.length === 0 && (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No integration data available
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default IntegrationStatus;
