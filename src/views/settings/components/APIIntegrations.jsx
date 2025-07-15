import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function APIIntegrations() {
  const [kycApiKey, setKycApiKey] = useState("sk_live_************");
  const [showKycApiKey, setShowKycApiKey] = useState(false);
  const [priceFeedUrl, setPriceFeedUrl] = useState("https://api.crypto.com/prices");
  const [fraudApiToken, setFraudApiToken] = useState("fd_live_************");
  const [showFraudApiToken, setShowFraudApiToken] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      // Here you would call your API to save settings
      alert("API integration settings saved!");
    }, 1000);
  };

  return (
    <Card sx={{ bgcolor: "white", boxShadow: "none", borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          API Integrations
        </Typography>
        <Box component="form" noValidate autoComplete="off" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="KYC API Key"
            type={showKycApiKey ? "text" : "password"}
            value={kycApiKey}
            onChange={e => setKycApiKey(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowKycApiKey(v => !v)} edge="end">
                    {showKycApiKey ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            label="Crypto Price Feed URL"
            value={priceFeedUrl}
            onChange={e => setPriceFeedUrl(e.target.value)}
            fullWidth
          />
          <TextField
            label="Fraud Detection API Token"
            type={showFraudApiToken ? "text" : "password"}
            value={fraudApiToken}
            onChange={e => setFraudApiToken(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowFraudApiToken(v => !v)} edge="end">
                    {showFraudApiToken ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Settings"}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
} 