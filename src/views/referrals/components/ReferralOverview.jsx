import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material';
import {
  PeopleAlt as PeopleIcon,
  TrendingUp as TrendingIcon,
  AttachMoney as MoneyIcon,
  Star as StarIcon
} from '@mui/icons-material';

const ReferralOverview = () => {
  // Mock data
  const overviewData = {
    totalReferrals: 1247,
    conversionRate: 68.5,
    totalRewards: 15420.50,
    topReferrers: [
      { name: 'John Doe', email: 'john@example.com', referrals: 45, earnings: 2250.00 },
      { name: 'Jane Smith', email: 'jane@example.com', referrals: 38, earnings: 1900.00 },
      { name: 'Mike Johnson', email: 'mike@example.com', referrals: 32, earnings: 1600.00 },
      { name: 'Sarah Wilson', email: 'sarah@example.com', referrals: 28, earnings: 1400.00 },
      { name: 'David Brown', email: 'david@example.com', referrals: 25, earnings: 1250.00 }
    ]
  };

  const statsCards = [
    {
      title: 'Total Referrals',
      value: overviewData.totalReferrals.toLocaleString(),
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      color: 'primary.main'
    },
    {
      title: 'Conversion Rate',
      value: `${overviewData.conversionRate}%`,
      icon: <TrendingIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      color: 'success.main'
    },
    {
      title: 'Total Rewards',
      value: `$${overviewData.totalRewards.toLocaleString()}`,
      icon: <MoneyIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
      color: 'warning.main'
    }
  ];

  return (
    <Box>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      {card.title}
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                      {card.value}
                    </Typography>
                  </Box>
                  {card.icon}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Top Referrers */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <StarIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Top Referrers
                </Typography>
              </Box>
              
              <List>
                {overviewData.topReferrers.map((referrer, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {referrer.name.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={referrer.name}
                        secondary={referrer.email}
                      />
                      <Box textAlign="right">
                        <Typography variant="body2" color="textSecondary">
                          {referrer.referrals} referrals
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          ${referrer.earnings.toLocaleString()}
                        </Typography>
                      </Box>
                    </ListItem>
                    {index < overviewData.topReferrers.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Conversion Funnel
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Invited Users</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {overviewData.totalReferrals}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={100} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Registered Users</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {Math.round(overviewData.totalReferrals * 0.85)}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={85} 
                  sx={{ height: 8, borderRadius: 4, bgcolor: 'grey.200' }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Active Users</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {Math.round(overviewData.totalReferrals * (overviewData.conversionRate / 100))}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={overviewData.conversionRate} 
                  sx={{ height: 8, borderRadius: 4, bgcolor: 'success.light' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReferralOverview; 