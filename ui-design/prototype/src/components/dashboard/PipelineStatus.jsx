import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Grid, 
  Divider, 
  /* Tooltip – not used here, remove import */ 
  Alert,
  useTheme,
  /* LinearProgress – not used here, remove import */
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InfoIcon from '@mui/icons-material/Info';
// Local date formatter to avoid pulling in date-fns.

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true
});

const PipelineStatus = ({ data = [], ...props }) => {
  const theme = useTheme();

  // Status configuration
  const statusConfig = {
    operational: {
      color: theme.palette.success.main,
      icon: CheckCircleOutlineIcon,
      label: 'Operational'
    },
    degraded: {
      color: theme.palette.warning.main,
      icon: WarningAmberIcon,
      label: 'Degraded'
    },
    failed: {
      color: theme.palette.error.main,
      icon: ErrorOutlineIcon,
      label: 'Failed'
    },
    unknown: {
      color: theme.palette.grey[500],
      icon: HelpOutlineIcon,
      label: 'Unknown'
    }
  };

  // Format date from ISO string
  const formatDate = (isoString) => {
    if (!isoString) return 'Unknown date';
    const date = new Date(isoString);
    // Guard against invalid dates
    if (Number.isNaN(date.getTime())) return 'Unknown date';
    return dateFormatter.format(date);
  };

  return (
    <Card 
      sx={{ 
        borderRadius: 2,
        boxShadow: theme.shadows[2],
        overflow: 'visible',
        ...props.sx
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Processing Pipeline
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Current status of the document processing pipeline stages
        </Typography>
        
        <Box sx={{ position: 'relative' }}>
          {data.map((stage, index) => {
            const isLast = index === data.length - 1;
            const status = statusConfig[stage.status] || statusConfig.unknown;
            const StatusIcon = status.icon;
            
            return (
              <Box key={stage.id} sx={{ position: 'relative', mb: isLast ? 0 : 4 }}>
                {/* Stage card */}
                <Card 
                  sx={{ 
                    borderRadius: 2,
                    boxShadow: theme.shadows[1],
                    borderLeft: `4px solid ${status.color}`,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[4],
                    }
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                      {/* Stage info */}
                      <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <StatusIcon 
                            sx={{ 
                              color: status.color, 
                              mr: 1,
                              fontSize: '1.2rem'
                            }} 
                          />
                          <Typography variant="subtitle1" fontWeight={600}>
                            {stage.name}
                          </Typography>
                          <Chip 
                            label={status.label} 
                            size="small"
                            sx={{ 
                              ml: 1.5, 
                              bgcolor: `${status.color}20`,
                              color: status.color,
                              fontWeight: 500
                            }}
                          />
                        </Box>
                        
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            mb: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {stage.description}
                        </Typography>
                        
                        {stage.alert && (
                          <Alert 
                            severity={stage.alert.severity || 'warning'} 
                            sx={{ 
                              mt: 1, 
                              py: 0.5,
                              '& .MuiAlert-message': {
                                padding: '4px 0'
                              }
                            }}
                          >
                            <Typography variant="caption">
                              {stage.alert.message}
                            </Typography>
                          </Alert>
                        )}
                      </Grid>
                      
                      {/* Stage metrics */}
                      <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                          {stage.metrics && Object.entries(stage.metrics).map(([key, value]) => {
                            // Skip lastUpdated as it's displayed separately
                            if (key === 'lastUpdated') return null;
                            
                            // Format the metric key for display
                            const formattedKey = key
                              .replace(/([A-Z])/g, ' $1') // Add space before capital letters
                              .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
                              
                            return (
                              <Box key={key} sx={{ minWidth: '120px' }}>
                                <Typography variant="caption" color="text.secondary">
                                  {formattedKey}
                                </Typography>
                                <Typography variant="body2" fontWeight={500}>
                                  {value}
                                </Typography>
                              </Box>
                            );
                          })}
                        </Box>
                        
                        {stage.metrics?.lastUpdated && (
                          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                            <InfoIcon sx={{ fontSize: '0.875rem', color: theme.palette.text.secondary, mr: 0.5 }} />
                            <Typography variant="caption" color="text.secondary">
                              Last updated: {formatDate(stage.metrics.lastUpdated)}
                            </Typography>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                
                {/* Connector arrow */}
                {!isLast && (
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      left: '50%',
                      bottom: -28,
                      transform: 'translateX(-50%)',
                      zIndex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        bgcolor: theme.palette.background.paper,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: theme.shadows[2]
                      }}
                    >
                      <ArrowForwardIcon 
                        sx={{ 
                          color: theme.palette.primary.main,
                          transform: 'rotate(90deg)'
                        }} 
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
        
        {data.length === 0 && (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No pipeline data available
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PipelineStatus;
