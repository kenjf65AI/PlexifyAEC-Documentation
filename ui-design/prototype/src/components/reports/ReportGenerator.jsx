import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField, 
  Divider, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  LinearProgress, 
  Chip, 
  Stack,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  ListItemButton,
  Collapse,
  Alert,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import DiversityIcon from '@mui/icons-material/Diversity3';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DataObjectIcon from '@mui/icons-material/DataObject';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import useStore from '../../context/store';
import { primaryGradient } from '../../styles/theme';

// Styled components
const ReportTypeCard = styled(Card)(({ theme, selected }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 1.5,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  border: selected ? `2px solid ${theme.palette.primary.main}` : '1px solid transparent',
  boxShadow: selected 
    ? `0 0 0 2px ${theme.palette.primary.main}30, 0 8px 16px rgba(0, 0, 0, 0.1)` 
    : '0 4px 12px rgba(0, 0, 0, 0.05)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  }
}));

const ReportIcon = styled(Avatar)(({ theme, color }) => ({
  backgroundColor: color || theme.palette.primary.main,
  width: 56,
  height: 56,
  marginBottom: theme.spacing(2)
}));

const GenerationProgressPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 1.5,
  marginBottom: theme.spacing(3),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  border: `1px solid ${theme.palette.divider}`,
  background: 'linear-gradient(135deg, rgba(86, 44, 230, 0.03) 0%, rgba(143, 116, 255, 0.08) 100%)',
}));

const StepProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
  }
}));

const RecentReportItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  }
}));

// Helper function to get report icon
const getReportIcon = (reportType) => {
  switch (reportType) {
    case 'pm-report':
      return <AssessmentIcon />;
    case 'inspection-report':
      return <FactCheckIcon />;
    case 'chapter33-report':
      return <HealthAndSafetyIcon />;
    case 'mwbe-report':
      return <DiversityIcon />;
    default:
      return <DescriptionIcon />;
  }
};

// Helper function to get report color
const getReportColor = (reportType) => {
  switch (reportType) {
    case 'pm-report':
      return '#562CE6'; // Primary purple
    case 'inspection-report':
      return '#1AC6A1'; // Teal
    case 'chapter33-report':
      return '#FF955C'; // Orange
    case 'mwbe-report':
      return '#F4B740'; // Yellow
    default:
      return '#562CE6'; // Default to primary
  }
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const ReportGenerator = () => {
  const theme = useTheme();
  const { 
    reports: { types: reportTypes, templates, generationStatus, recentReports },
    generateReport,
    simulateReportGeneration,
    updateReportGenerationStatus
  } = useStore();
  
  const [selectedReportType, setSelectedReportType] = useState('');
  const [reportOptions, setReportOptions] = useState({
    date: new Date().toISOString().split('T')[0],
    includeAppendices: true,
    format: 'pdf'
  });
  const [activeGeneration, setActiveGeneration] = useState(null);
  const [expandedReport, setExpandedReport] = useState(null);

  // Find active generation if there is one
  useEffect(() => {
    const inProgress = generationStatus.find(status => status.status === 'in-progress');
    if (inProgress) {
      setActiveGeneration(inProgress);
    } else {
      setActiveGeneration(null);
    }
  }, [generationStatus]);

  // Handle report type selection
  const handleReportTypeSelect = (reportType) => {
    setSelectedReportType(reportType);
  };

  // Handle report option changes
  const handleOptionChange = (option, value) => {
    setReportOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  // Handle report generation
  const handleGenerateReport = () => {
    if (!selectedReportType) return;
    
    // Generate report ID
    const reportId = `gen-${selectedReportType}-${Date.now()}`;
    
    // Generate the report
    generateReport(selectedReportType, reportOptions);
    
    // Simulate the report generation process
    simulateReportGeneration(reportId);
    
    // Set as active generation
    const newGeneration = generationStatus.find(status => status.id === reportId);
    if (newGeneration) {
      setActiveGeneration(newGeneration);
    }
  };

  // Toggle expanded report details
  const toggleReportExpand = (reportId) => {
    setExpandedReport(expandedReport === reportId ? null : reportId);
  };

  return (
    <Box sx={{ pb: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Report Generator
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Generate Project Management and Inspection reports with AI-powered insights and regulatory evidence.
      </Typography>

      {/* Active Generation Progress */}
      {activeGeneration && (
        <GenerationProgressPaper elevation={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="medium">
              Generating: {activeGeneration.reportName}
            </Typography>
            <Chip 
              label={`${activeGeneration.progress}%`}
              color="primary"
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
          
          <StepProgressBar 
            variant="determinate" 
            value={activeGeneration.progress} 
            color="primary"
            sx={{ mb: 3 }}
          />
          
          <Stepper activeStep={activeGeneration.steps.findIndex(step => step.status === 'in-progress')} alternativeLabel>
            {activeGeneration.steps.map((step, index) => (
              <Step key={index} completed={step.status === 'complete'}>
                <StepLabel>
                  {step.name}
                  {step.status === 'complete' && step.duration && (
                    <Typography variant="caption" display="block" color="text.secondary">
                      {step.duration}
                    </Typography>
                  )}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {activeGeneration.status === 'in-progress' 
                ? 'Processing your report. This typically takes 30-60 seconds.' 
                : 'Report generation complete! You can download your report below.'}
            </Typography>
            
            {activeGeneration.status === 'complete' && activeGeneration.result && (
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<DownloadIcon />}
                href={activeGeneration.result.downloadUrl}
                sx={{ mt: 2 }}
              >
                Download Report
              </Button>
            )}
          </Box>
        </GenerationProgressPaper>
      )}

      {/* Report Type Selection */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        1. Select Report Type
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {reportTypes.map((reportType) => (
          <Grid item xs={12} sm={6} md={3} key={reportType.id}>
            <ReportTypeCard 
              selected={selectedReportType === reportType.id}
              onClick={() => handleReportTypeSelect(reportType.id)}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <ReportIcon color={reportType.primaryColor}>
                  {getReportIcon(reportType.id)}
                </ReportIcon>
                <Typography variant="h6" gutterBottom>
                  {reportType.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: 60, overflow: 'hidden' }}>
                  {reportType.description}
                </Typography>
                <Chip 
                  label={reportType.generationTime} 
                  size="small" 
                  color="primary" 
                  variant="outlined"
                  icon={<HourglassEmptyIcon fontSize="small" />}
                />
              </CardContent>
            </ReportTypeCard>
          </Grid>
        ))}
      </Grid>

      {/* Report Options */}
      {selectedReportType && (
        <>
          <Typography variant="h6" gutterBottom>
            2. Configure Report Options
          </Typography>
          <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="report-date-label">Report Date</InputLabel>
                  <TextField
                    type="date"
                    value={reportOptions.date}
                    onChange={(e) => handleOptionChange('date', e.target.value)}
                    fullWidth
                    label="Report Date"
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="report-format-label">Format</InputLabel>
                  <Select
                    labelId="report-format-label"
                    id="report-format"
                    value={reportOptions.format}
                    label="Format"
                    onChange={(e) => handleOptionChange('format', e.target.value)}
                  >
                    <MenuItem value="pdf">PDF Document</MenuItem>
                    <MenuItem value="json">JSON Data</MenuItem>
                    <MenuItem value="html">HTML Report</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="report-sections-label">Include Sections</InputLabel>
                  <Select
                    labelId="report-sections-label"
                    id="report-sections"
                    multiple
                    value={reportOptions.sections || []}
                    label="Include Sections"
                    onChange={(e) => handleOptionChange('sections', e.target.value)}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {selectedReportType === 'pm-report' && [
                      <MenuItem key="executive-summary" value="executive-summary">Executive Summary</MenuItem>,
                      <MenuItem key="schedule-variance" value="schedule-variance">Schedule Variance</MenuItem>,
                      <MenuItem key="cost-change-orders" value="cost-change-orders">Cost & Change Orders</MenuItem>,
                      <MenuItem key="rfi-status" value="rfi-status">RFI Status</MenuItem>,
                      <MenuItem key="risk-matrix" value="risk-matrix">Risk Matrix</MenuItem>,
                      <MenuItem key="mwbe-participation" value="mwbe-participation">M/WBE Participation</MenuItem>,
                      <MenuItem key="upcoming-milestones" value="upcoming-milestones">Upcoming Milestones</MenuItem>,
                      <MenuItem key="evidence-appendix" value="evidence-appendix">Evidence Appendix</MenuItem>
                    ]}
                    {selectedReportType === 'chapter33-report' && [
                      <MenuItem key="compliance-overview" value="compliance-overview">Compliance Overview</MenuItem>,
                      <MenuItem key="chapter33-checklist" value="chapter33-checklist">Chapter 33 Checklist</MenuItem>,
                      <MenuItem key="ceqr-status" value="ceqr-status">CEQR Status</MenuItem>,
                      <MenuItem key="accessibility-findings" value="accessibility-findings">Accessibility Findings</MenuItem>,
                      <MenuItem key="photo-log" value="photo-log">Photo Log</MenuItem>,
                      <MenuItem key="non-conformance" value="non-conformance">Non-conformance</MenuItem>,
                      <MenuItem key="signoff" value="signoff">Sign-off & Certification</MenuItem>,
                      <MenuItem key="evidence-appendix" value="evidence-appendix">Evidence Appendix</MenuItem>
                    ]}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Additional Notes"
                  multiline
                  rows={3}
                  fullWidth
                  placeholder="Add any specific instructions or notes for the report generation..."
                  value={reportOptions.notes || ''}
                  onChange={(e) => handleOptionChange('notes', e.target.value)}
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 3, textAlign: 'right' }}>
              <Button 
                variant="contained" 
                color="primary"
                size="large"
                onClick={handleGenerateReport}
                disabled={!selectedReportType || activeGeneration?.status === 'in-progress'}
                startIcon={<AssessmentIcon />}
              >
                Generate Report
              </Button>
            </Box>
          </Paper>
        </>
      )}

      {/* Recent Reports */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Recent Reports
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        {recentReports.length > 0 ? (
          <List sx={{ p: 0 }}>
            {recentReports.map((report) => (
              <Box key={report.id}>
                <RecentReportItem disablePadding>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: getReportColor(report.type) }}>
                      {getReportIcon(report.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={report.name}
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        Generated: {formatDate(report.date)}
                      </Typography>
                    }
                  />
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DownloadIcon />}
                      href={report.downloadUrl}
                    >
                      Download
                    </Button>
                    <IconButton size="small" onClick={() => toggleReportExpand(report.id)}>
                      {expandedReport === report.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Stack>
                </RecentReportItem>
                
                <Collapse in={expandedReport === report.id} timeout="auto" unmountOnExit>
                  <Box sx={{ pl: 9, pr: 2, pb: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Report ID: {report.id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Type: {report.type.replace('-', ' ').toUpperCase()}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Size: {report.size}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Format: {report.downloadUrl.split('.').pop().toUpperCase()}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<PictureAsPdfIcon />}
                            href={report.downloadUrl}
                          >
                            PDF
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<DataObjectIcon />}
                            href={report.jsonUrl}
                          >
                            JSON
                          </Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </Collapse>
              </Box>
            ))}
          </List>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No reports generated yet. Use the form above to create your first report.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ReportGenerator;
