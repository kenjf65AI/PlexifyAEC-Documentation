import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import ReportGenerator from '../components/reports/ReportGenerator';

// Styled components
const HeaderPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 1.5,
  background: 'linear-gradient(135deg, rgba(86, 44, 230, 0.05) 0%, rgba(143, 116, 255, 0.1) 100%)',
  border: '1px solid rgba(86, 44, 230, 0.1)'
}));

const Reports = () => {
  return (
    <Box sx={{ pb: 4 }}>
      {/* Header with page info */}
      <HeaderPaper elevation={0}>
        <Typography variant="h4" gutterBottom>
          Reports
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Generate Project Management and Inspection/Audit reports with embedded NYC regulatory evidence.
          All reports include traceable evidence links so reviewers can drill down to primary sources.
        </Typography>
      </HeaderPaper>

      {/* Report Generator Component */}
      <ReportGenerator />
    </Box>
  );
};

export default Reports;
