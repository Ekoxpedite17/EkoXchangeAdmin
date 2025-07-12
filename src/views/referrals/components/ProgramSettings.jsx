import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Settings as SettingsIcon,
  AttachMoney as MoneyIcon,
  Schedule as ScheduleIcon,
  Security as SecurityIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

const ProgramSettings = () => {
  const [settings, setSettings] = useState({
    programEnabled: true,
    globalCommissionRate: 5,
    maxRewardPerUser: 1000,
    payoutSchedule: 'instant',
    minimumPayout: 50,
    maxReferralsPerUser: 100,
    requireKYC: true,
    autoApprove: false
  });

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveSettings = () => {
    // Handle saving settings
    console.log('Saving settings:', settings);
  };

  const payoutOptions = [
    { value: 'instant', label: 'Instant', description: 'Rewards paid immediately' },
    { value: 'weekly', label: 'Weekly', description: 'Rewards paid every week' },
    { value: 'monthly', label: 'Monthly', description: 'Rewards paid monthly' },
    { value: 'after_trade', label: 'After Trade', description: 'Rewards paid after first trade' }
  ];

  return (
    <Box>
      {/* Program Status */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Program Status
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Enable or disable the referral program globally
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.programEnabled}
                  onChange={(e) => handleSettingChange('programEnabled', e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Chip 
                  label={settings.programEnabled ? "Active" : "Disabled"} 
                  color={settings.programEnabled ? "success" : "error"}
                />
              }
            />
          </Box>
        </CardContent>
      </Card>

      {/* Commission Settings */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <MoneyIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Commission Settings
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Global Commission Rate (%)
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={settings.globalCommissionRate}
                  onChange={(e) => handleSettingChange('globalCommissionRate', Number(e.target.value))}
                  inputProps={{ min: 1, max: 50 }}
                  helperText="Percentage of transaction value given as reward"
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Maximum Reward Per User ($)
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={settings.maxRewardPerUser}
                  onChange={(e) => handleSettingChange('maxRewardPerUser', Number(e.target.value))}
                  inputProps={{ min: 0 }}
                  helperText="Cap on total rewards a user can earn"
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Minimum Payout Amount ($)
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={settings.minimumPayout}
                  onChange={(e) => handleSettingChange('minimumPayout', Number(e.target.value))}
                  inputProps={{ min: 0 }}
                  helperText="Minimum amount before payout is processed"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <ScheduleIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Payout Settings
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Payout Schedule
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={settings.payoutSchedule}
                    onChange={(e) => handleSettingChange('payoutSchedule', e.target.value)}
                  >
                    {payoutOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box>
                          <Typography variant="body1">{option.label}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {option.description}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Maximum Referrals Per User
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={settings.maxReferralsPerUser}
                  onChange={(e) => handleSettingChange('maxReferralsPerUser', Number(e.target.value))}
                  inputProps={{ min: 1 }}
                  helperText="Limit on number of successful referrals per user"
                />
              </Box>

              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.autoApprove}
                      onChange={(e) => handleSettingChange('autoApprove', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Auto-approve referrals"
                />
                <Typography variant="body2" color="textSecondary">
                  Automatically approve referrals without manual review
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Security Settings */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <SecurityIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Security Settings
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.requireKYC}
                    onChange={(e) => handleSettingChange('requireKYC', e.target.checked)}
                    color="primary"
                  />
                }
                label="Require KYC for rewards"
              />
              <Typography variant="body2" color="textSecondary">
                Users must complete KYC before receiving referral rewards
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Current Settings Summary */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Current Settings Summary
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckIcon color="success" />
              </ListItemIcon>
              <ListItemText
                primary="Program Status"
                secondary={settings.programEnabled ? "Active" : "Disabled"}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <MoneyIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Commission Rate"
                secondary={`${settings.globalCommissionRate}% per successful referral`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ScheduleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Payout Schedule"
                secondary={payoutOptions.find(opt => opt.value === settings.payoutSchedule)?.label}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SecurityIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="KYC Requirement"
                secondary={settings.requireKYC ? "Required" : "Not required"}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSaveSettings}
          startIcon={<SettingsIcon />}
        >
          Save Settings
        </Button>
      </Box>

      {/* Warning Alert */}
      <Alert severity="warning" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Warning:</strong> Changing these settings will affect all new referrals. 
          Existing pending rewards will use the previous settings.
        </Typography>
      </Alert>
    </Box>
  );
};

export default ProgramSettings; 