import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Paper,
  Button,
  Stack,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import useStore from '../context/store';
import { primaryGradient } from '../styles/theme';

// New reusable dashboard components
import StatCard from '../components/dashboard/StatCard';
import AgentCard from '../components/dashboard/AgentCard';
import PipelineStatus from '../components/dashboard/PipelineStatus';
import IntegrationStatus from '../components/dashboard/IntegrationStatus';

// Styled components
const GradientCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 1.5,
  background: primaryGradient,
  color: theme.palette.common.white,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
  }
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  '&::after': {
    content: '""',
    flexGrow: 1,
    height: '1px',
    backgroundColor: theme.palette.divider,
    marginLeft: theme.spacing(2),
  }
}));

const Dashboard = () => {
  const theme = useTheme();
  
  // STEP 3: Hardcoded test data for debugging
  // This bypasses any potential issues with the Zustand store
  const testProjectStats = [
    {
      id: "docs-processed",
      label: "Documents Processed",
      value: 1247,
      change: 12.5,
      changeLabel: "from last month",
      icon: "DocumentScanner"
    },
    {
      id: "compliance-score",
      label: "Compliance Score",
      value: 87,
      suffix: "%",
      change: 3.2,
      changeLabel: "from last assessment",
      icon: "Gavel"
    },
    {
      id: "active-issues",
      label: "Active Issues",
      value: 24,
      change: -8,
      changeLabel: "from last week",
      icon: "BugReport"
    }
  ];
  
  const testAgentCapabilities = [
    {
      id: "document-analysis",
      title: "Document Analysis",
      description: "Extracts key information from construction documents, RFIs, and specifications",
      icon: "Description",
      color: "#562CE6",
      metrics: {
        accuracy: 94,
        documentsProcessed: 892,
        averageProcessingTime: "3.2 min"
      }
    },
    {
      id: "compliance-check",
      title: "Compliance Checking",
      description: "Validates documents against NYC Building Code, Zoning Resolution, and project requirements",
      icon: "FactCheck",
      color: "#1AC6A1",
      metrics: {
        accuracy: 91,
        regulationsTracked: 347,
        issuesPrevented: 78
      }
    }
  ];
  
  const testProcessingPipeline = [
    {
      id: "document-intake",
      name: "Document Intake",
      description: "Initial processing and classification of uploaded documents",
      status: "operational",
      metrics: {
        throughput: "125 docs/day",
        accuracy: "98%",
        lastUpdated: "2025-07-12T08:30:00Z"
      }
    },
    {
      id: "content-extraction",
      name: "Content Extraction",
      description: "Structured data extraction from documents using OCR and NLP",
      status: "operational",
      metrics: {
        throughput: "95 docs/day",
        accuracy: "92%",
        lastUpdated: "2025-07-12T10:15:00Z"
      }
    }
  ];
  
  const testIntegrationStatus = [
    {
      id: "procore",
      name: "Procore",
      type: "Project Management",
      status: "connected",
      lastSync: "2025-07-12T16:30:00Z",
      metrics: {
        documentsSync: 342,
        issuesTracked: 87,
        syncFrequency: "15 min"
      }
    },
    {
      id: "autodesk-bim360",
      name: "Autodesk BIM 360",
      type: "BIM Collaboration",
      status: "connected",
      lastSync: "2025-07-12T16:15:00Z",
      metrics: {
        modelsSync: 24,
        issuesTracked: 56,
        syncFrequency: "30 min"
      }
    }
  ];
  
  // Test project data
  const testProject = {
    name: "NYC Borough-Based Jail System - Manhattan Facility",
    phase: "Construction Documents",
    budget: "$1.8B",
    timeline: "2024-2027",
    location: "Manhattan, NY",
    compliance: {
      overall: 87
    }
  };
  
  // Optional: Use store data if available, otherwise use test data
  const { 
    dashboard,
    project,
    compliance
  } = useStore();
  
  // Use test data instead of store data for debugging
  const projectStats = testProjectStats;
  const agentCapabilities = testAgentCapabilities;
  const processingPipeline = testProcessingPipeline;
  const integrationStatus = testIntegrationStatus;
  const projectData = testProject;
  
  // Simplified test compliance data
  const testCompliance = {
    overallScore: 87,
    statusCounts: {
      compliant: 42,
      warning: 7,
      'non-compliant': 3
    },
    status: [
      {
        id: "nyc-zoning",
        name: "NYC Zoning Resolution",
        status: "compliant",
        score: 92,
        details: "All requirements met",
        statusIcon: "✓"
      },
      {
        id: "ada",
        name: "ADA Compliance",
        status: "compliant",
        score: 97,
        details: "Accessibility standards verified",
        statusIcon: "✓"
      }
    ]
  };
  
  // Use test compliance data
  const complianceData = testCompliance;
  
  // Flag to control rendering of compliance section
  const showCompliance = true;

  return (
    <Box sx={{ pb: 4 }}>
      {/* Header with project info */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 2,
          background: 'linear-gradient(135deg, rgba(86, 44, 230, 0.05) 0%, rgba(143, 116, 255, 0.1) 100%)',
          border: '1px solid rgba(86, 44, 230, 0.1)'
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {projectData.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {projectData.phase} Phase | Budget: {projectData.budget} | Timeline: {projectData.timeline}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Chip 
                label={`Compliance: ${projectData.compliance.overall}%`} 
                color={projectData.compliance.overall >= 90 ? "success" : "warning"}
                size="small"
                sx={{ mr: 1, mb: 1 }}
              />
              <Chip 
                label={`Location: ${projectData.location}`}
                variant="outlined"
                size="small"
                sx={{ mr: 1, mb: 1 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<RefreshIcon />}
              sx={{ mr: 1 }}
            >
              Refresh Data
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Project Statistics */}
      <SectionTitle variant="h5">Project Statistics</SectionTitle>
      <Grid container spacing={3}>
        {projectStats.map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat.id}>
            <StatCard
              label={stat.label}
              value={stat.value}
              change={stat.change}
              changeLabel={stat.changeLabel}
              icon={stat.icon}
              suffix={stat.suffix}
            />
          </Grid>
        ))}
      </Grid>

      {/* Agent Capabilities */}
      <SectionTitle variant="h5">Agent Capabilities</SectionTitle>
      <Grid container spacing={3}>
        {agentCapabilities.map((capability) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={capability.id}>
            <AgentCard
              title={capability.title}
              description={capability.description}
              icon={capability.icon}
              color={capability.color}
              metrics={capability.metrics}
            />
          </Grid>
        ))}
      </Grid>

      {/* Processing Pipeline */}
      <SectionTitle variant="h5">Processing Pipeline</SectionTitle>
      <PipelineStatus data={processingPipeline} />

      {/* Integration Status */}
      <SectionTitle variant="h5">Integration Status</SectionTitle>
      <IntegrationStatus integrations={integrationStatus} />

      {/* Compliance Overview - conditionally rendered */}
      {showCompliance && (
        <>
          <SectionTitle variant="h5">Compliance Overview</SectionTitle>
          <Card sx={{ mb: 4, borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <GradientCard>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                        Overall Compliance Score
                      </Typography>
                      <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                        {complianceData.overallScore}%
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Chip 
                          label={`${complianceData.statusCounts.compliant} Compliant`}
                          sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                          size="small"
                        />
                        <Chip 
                          label={`${complianceData.statusCounts.warning} Warnings`}
                          sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                          size="small"
                        />
                        <Chip 
                          label={`${complianceData.statusCounts['non-compliant']} Issues`}
                          sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                          size="small"
                        />
                      </Box>
                    </CardContent>
                  </GradientCard>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Stack spacing={2}>
                    {complianceData.status.map((item) => (
                      <Paper 
                        key={item.id} 
                        elevation={0} 
                        sx={{ 
                          p: 2, 
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: item.status === 'compliant' 
                            ? 'success.light' 
                            : item.status === 'warning' 
                              ? 'warning.light' 
                              : 'error.light',
                          bgcolor: item.status === 'compliant' 
                            ? 'success.light' 
                            : item.status === 'warning' 
                              ? 'warning.light' 
                              : 'error.light',
                          opacity: 0.1
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography 
                              variant="h4" 
                              component="span" 
                              sx={{ 
                                mr: 2,
                                color: item.status === 'compliant' 
                                  ? 'success.main' 
                                  : item.status === 'warning' 
                                    ? 'warning.main' 
                                    : 'error.main'
                              }}
                            >
                              {item.statusIcon}
                            </Typography>
                            <Box>
                              <Typography variant="body1" fontWeight="medium">
                                {item.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {item.details}
                              </Typography>
                            </Box>
                          </Box>
                          <Chip 
                            label={`${item.score}%`}
                            size="small"
                            sx={{ 
                              bgcolor: item.status === 'compliant' 
                                ? 'success.main' 
                                : item.status === 'warning' 
                                  ? 'warning.main' 
                                  : 'error.main',
                              color: 'white'
                            }}
                          />
                        </Box>
                      </Paper>
                    ))}
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      sx={{ alignSelf: 'flex-end' }}
                    >
                      View All Compliance Items
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
