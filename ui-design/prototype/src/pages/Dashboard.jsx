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
  const { 
    dashboard: { projectStats, agentCapabilities, processingPipeline, integrationStatus },
    project,
    compliance
  } = useStore();

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
              {project.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {project.phase} Phase | Budget: {project.budget} | Timeline: {project.timeline}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Chip 
                label={`Compliance: ${project.compliance.overall}%`} 
                color={project.compliance.overall >= 90 ? "success" : "warning"}
                size="small"
                sx={{ mr: 1, mb: 1 }}
              />
              <Chip 
                label={`Location: ${project.location}`}
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

      {/* Compliance Overview */}
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
                    {compliance.overallScore}%
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Chip 
                      label={`${compliance.statusCounts.compliant} Compliant`}
                      sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                      size="small"
                    />
                    <Chip 
                      label={`${compliance.statusCounts.warning} Warnings`}
                      sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                      size="small"
                    />
                    <Chip 
                      label={`${compliance.statusCounts['non-compliant']} Issues`}
                      sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                      size="small"
                    />
                  </Box>
                </CardContent>
              </GradientCard>
            </Grid>
            <Grid item xs={12} md={8}>
              <Stack spacing={2}>
                {compliance.status.slice(0, 4).map((item) => (
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
    </Box>
  );
};

export default Dashboard;
