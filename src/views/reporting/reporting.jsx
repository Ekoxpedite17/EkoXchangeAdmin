import { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Stack, Tab, Tabs } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

// Components
import MetricsCard from './components/MetricsCard';
import TrendChart from './components/TrendChart';
import ActivityLog from './components/ActivityLog';
import DateRangePicker from './components/DateRangePicker';

const ReportingAnalytics = () => {
  const [timeRange, setTimeRange] = useState('daily');
  const [dateRange, setDateRange] = useState([null, null]);

  const handleExport = (format) => {
    // Handle export logic
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h3">Reporting & Analytics</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<FileDownloadIcon />} onClick={() => handleExport('pdf')}>
            Export PDF
          </Button>
          <Button variant="outlined" startIcon={<FileDownloadIcon />} onClick={() => handleExport('csv')}>
            Export CSV
          </Button>
        </Stack>
      </Stack>

      <DateRangePicker value={dateRange} onChange={setDateRange} />

      {/* Metrics Overview */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricsCard title="Daily Trade Volume" value="$1.2M" trend="+12.5%" isPositive={true} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricsCard title="Gift Card Transactions" value="2,450" trend="+8.3%" isPositive={true} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricsCard title="Crypto Flow" value="₿ 45.32" trend="-3.2%" isPositive={false} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricsCard title="New Users" value="342" trend="+15.7%" isPositive={true} />
        </Grid>
      </Grid>

      {/* Trend Charts */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={timeRange} onChange={(e, v) => setTimeRange(v)}>
              <Tab label="Daily" value="daily" />
              <Tab label="Weekly" value="weekly" />
              <Tab label="Monthly" value="monthly" />
            </Tabs>
          </Box>
          <TrendChart timeRange={timeRange} dateRange={dateRange} />
        </CardContent>
      </Card>

      {/* System Logs & Activity */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            System Logs & Admin Activity
          </Typography>
          <ActivityLog />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReportingAnalytics;
