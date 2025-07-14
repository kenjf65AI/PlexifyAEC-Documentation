import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  Chip, 
  List, 
  ListItem, 
  ListItemText,
  ListItemIcon,
  Collapse,
  Button,
  IconButton,
  LinearProgress,
  Avatar,
  Stack,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import DescriptionIcon from '@mui/icons-material/Description';
import useStore from '../../context/store';

// Styled components
const ComplianceItem = styled(Paper)(({ theme, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'compliant':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'non-compliant':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  return {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    borderLeft: `4px solid ${getStatusColor()}`,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-2px)'
    }
  };
});

const ComplianceScore = styled(Box)(({ theme, score }) => {
  let color;
  if (score >= 90) {
    color = theme.palette.success.main;
  } else if (score >= 70) {
    color = theme.palette.warning.main;
  } else {
    color = theme.palette.error.main;
  }

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: '50%',
    backgroundColor: `${color}20`,
    color: color,
    fontWeight: 'bold',
    fontSize: '1.1rem'
  };
});

const StatusIcon = ({ status, fontSize = 'medium' }) => {
  const theme = useTheme();

  switch (status) {
    case 'compliant':
      return <CheckCircleIcon fontSize={fontSize} sx={{ color: theme.palette.success.main }} />;
    case 'warning':
      return <WarningIcon fontSize={fontSize} sx={{ color: theme.palette.warning.main }} />;
    case 'non-compliant':
      return <ErrorIcon fontSize={fontSize} sx={{ color: theme.palette.error.main }} />;
    default:
      return null;
  }
};

const ComplianceSidebar = () => {
  const theme = useTheme();
  const { compliance } = useStore();
  const [expandedItems, setExpandedItems] = useState({});

  // Toggle expansion of an item
  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Helper function to get status text
  const getStatusText = (status) => {
    switch (status) {
      case 'compliant':
        return 'Compliant';
      case 'warning':
        return 'Warning';
      case 'non-compliant':
        return 'Non-Compliant';
      default:
        return 'Unknown';
    }
  };

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'non-compliant':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  return (
    <Box sx={{ height: '100%', overflow: 'auto', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Compliance Status
        </Typography>
        <Chip 
          label={`${compliance.overallScore}%`}
          color={compliance.overallScore >= 90 ? "success" : compliance.overallScore >= 70 ? "warning" : "error"}
          sx={{ fontWeight: 'bold' }}
        />
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Status summary */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Compliant</Typography>
          <Typography variant="h6" sx={{ color: theme.palette.success.main }}>
            {compliance.statusCounts.compliant}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Warnings</Typography>
          <Typography variant="h6" sx={{ color: theme.palette.warning.main }}>
            {compliance.statusCounts.warning}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Issues</Typography>
          <Typography variant="h6" sx={{ color: theme.palette.error.main }}>
            {compliance.statusCounts['non-compliant']}
          </Typography>
        </Box>
      </Box>

      {/* Compliance items */}
      {compliance.detailedData.map((item) => (
        <ComplianceItem key={item.id} status={item.status}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StatusIcon status={item.status} />
              <Box sx={{ ml: 1.5 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Box>
            </Box>
            <ComplianceScore score={item.score}>
              {item.score}%
            </ComplianceScore>
          </Box>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip 
              label={getStatusText(item.status)}
              size="small"
              sx={{ 
                bgcolor: `${getStatusColor(item.status)}20`,
                color: getStatusColor(item.status),
                fontWeight: 'medium'
              }}
            />
            <IconButton 
              size="small" 
              onClick={() => toggleExpand(item.id)}
              sx={{ 
                transition: 'transform 0.2s',
                transform: expandedItems[item.id] ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>

          <Collapse in={expandedItems[item.id]} timeout="auto" unmountOnExit>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" fontWeight="medium" gutterBottom>
                Details
              </Typography>
              <Typography variant="body2" paragraph>
                {item.details}
              </Typography>

              {/* Required Documents */}
              {item.requiredDocuments && item.requiredDocuments.length > 0 && (
                <>
                  <Typography variant="body2" fontWeight="medium" gutterBottom>
                    Required Documents
                  </Typography>
                  <List dense disablePadding>
                    {item.requiredDocuments.map((doc, index) => (
                      <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <DescriptionIcon 
                            fontSize="small" 
                            color={doc.status === 'verified' ? 'success' : doc.status === 'missing' ? 'error' : 'warning'} 
                          />
                        </ListItemIcon>
                        <ListItemText 
                          primary={doc.name} 
                          secondary={doc.docId || 'Not provided'} 
                          primaryTypographyProps={{ variant: 'body2' }}
                          secondaryTypographyProps={{ variant: 'caption' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              {/* Issues */}
              {item.issues && item.issues.length > 0 && (
                <>
                  <Typography variant="body2" fontWeight="medium" gutterBottom sx={{ mt: 2 }}>
                    Issues
                  </Typography>
                  <List dense disablePadding>
                    {item.issues.map((issue, index) => (
                      <ListItem key={index} disablePadding sx={{ 
                        py: 1, 
                        px: 2, 
                        mb: 1, 
                        bgcolor: 'background.default',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: issue.severity === 'high' 
                          ? theme.palette.error.light 
                          : issue.severity === 'medium' 
                            ? theme.palette.warning.light 
                            : theme.palette.info.light,
                      }}>
                        <ListItemText 
                          primary={issue.description} 
                          secondary={
                            <>
                              <Typography variant="caption" component="span" display="block">
                                Action: {issue.action}
                              </Typography>
                              <Typography variant="caption" component="span" display="block">
                                Due: {new Date(issue.dueDate).toLocaleDateString()}
                              </Typography>
                            </>
                          } 
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              {/* Verification Method */}
              <Typography variant="body2" fontWeight="medium" gutterBottom sx={{ mt: 2 }}>
                Verification Method
              </Typography>
              <Typography variant="body2" paragraph>
                {item.verificationMethod}
              </Typography>

              {/* Link to regulation */}
              <Button 
                variant="outlined" 
                size="small" 
                fullWidth
                href={item.regulationUrl} 
                target="_blank"
                sx={{ mt: 1 }}
              >
                View Regulation Details
              </Button>
            </Box>
          </Collapse>
        </ComplianceItem>
      ))}

      <Box sx={{ textAlign: 'center', mt: 2, mb: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Last updated: {new Date(compliance.lastUpdated).toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default ComplianceSidebar;
