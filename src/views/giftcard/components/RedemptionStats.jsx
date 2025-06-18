import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, CircularProgress, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockRedemptionStats } from '../data/mockData';

const RedemptionStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Using mock data instead of API call
        setStats(mockRedemptionStats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Redemption Statistics
        </Typography>
        <Grid spacing={3}>
          <Grid item xs={12} md={8}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats?.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="success" stroke="#4CAF50" />
                <Line type="monotone" dataKey="failure" stroke="#f44336" />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6">Success Rate</Typography>
                <Typography variant="h4" color="success.main">
                  {stats?.successRate}%
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Failure Rate</Typography>
                <Typography variant="h4" color="error.main">
                  {stats?.failureRate}%
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RedemptionStats;
