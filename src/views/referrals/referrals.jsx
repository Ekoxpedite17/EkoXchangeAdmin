import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  Tabs,
  Tab,
  Paper,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Chip,
  Alert,
  Divider
} from '@mui/material';
import {
  PeopleAlt as PeopleIcon,
  TrendingUp as TrendingIcon,
  AttachMoney as MoneyIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

// Import components (we'll create these next)
import ReferralOverview from './components/ReferralOverview';
import UserReferralTracking from './components/UserReferralTracking';
import ReferralEarnings from './components/ReferralEarnings';
import FraudMonitoring from './components/FraudMonitoring';
import ProgramSettings from './components/ProgramSettings';

const Referrals = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [programEnabled, setProgramEnabled] = useState(true);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const tabItems = [
    { label: 'Overview', icon: <TrendingIcon /> },
    { label: 'User Tracking', icon: <PeopleIcon /> },
    { label: 'Earnings', icon: <MoneyIcon /> },
    { label: 'Fraud Monitoring', icon: <SecurityIcon /> },
    { label: 'Settings', icon: <SettingsIcon /> }
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            Referral System Management
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={programEnabled}
                onChange={(e) => setProgramEnabled(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Box display="flex" alignItems="center" gap={1}>
                <Chip 
                  label={programEnabled ? "Active" : "Disabled"} 
                  color={programEnabled ? "success" : "error"}
                  size="small"
                />
                <Typography variant="body2">
                  Referral Program
                </Typography>
              </Box>
            }
          />
        </Box>
        
        {!programEnabled && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Referral program is currently disabled. Users cannot earn rewards from referrals.
          </Alert>
        )}
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minHeight: 64,
              textTransform: 'none',
              fontSize: '0.875rem',
              fontWeight: 500
            }
          }}
        >
          {tabItems.map((item, index) => (
            <Tab
              key={index}
              label={
                <Box display="flex" alignItems="center" gap={1}>
                  {item.icon}
                  {item.label}
                </Box>
              }
            />
          ))}
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <Box>
        {activeTab === 0 && <ReferralOverview />}
        {activeTab === 1 && <UserReferralTracking />}
        {activeTab === 2 && <ReferralEarnings />}
        {activeTab === 3 && <FraudMonitoring />}
        {activeTab === 4 && <ProgramSettings />}
      </Box>
    </Box>
  );
};

export default Referrals;
