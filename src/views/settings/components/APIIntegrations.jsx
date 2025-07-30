import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function APIIntegrations() {
  const [apiKeys, setApiKeys] = useState([
    { key: "sk_live_************", active: true },
  ]);
  const [accessRole, setAccessRole] = useState("Admin");
  const [priceSource, setPriceSource] = useState("CoinGecko");
  const [priceInterval, setPriceInterval] = useState("30");
  const [webhooks, setWebhooks] = useState([
    { event: "Order Update", url: "" },
  ]);
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
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          {apiKeys.map((item, idx) => (
            <TextField
              key={idx}
              label={`API Key ${idx + 1}`}
              type="password"
              value={item.key}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        const updated = [...apiKeys];
                        updated[idx].active = !updated[idx].active;
                        setApiKeys(updated);
                      }}
                    >
                      {item.active ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ))}
          <TextField
            select
            label="API Access Role"
            value={accessRole}
            onChange={(e) => setAccessRole(e.target.value)}
            fullWidth
          >
            {["Admin", "Partner", "Read-only"].map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          
          <TextField
            select
            label="Crypto Price Feed Source"
            value={priceSource}
            onChange={(e) => setPriceSource(e.target.value)}
            fullWidth
          >
            {["CoinGecko", "CoinMarketCap"].map((src) => (
              <MenuItem key={src} value={src}>
                {src}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Price Sync Interval (in seconds)"
            value={priceInterval}
            onChange={(e) => setPriceInterval(e.target.value)}
            fullWidth
          />
          {webhooks.map((hook, idx) => (
            <TextField
              key={idx}
              label={`Webhook for ${hook.event}`}
              placeholder="https://yourapp.com/webhook"
              value={hook.url}
              onChange={(e) => {
                const updated = [...webhooks];
                updated[idx].url = e.target.value;
                setWebhooks(updated);
              }}
              fullWidth
            />
          ))}
          <TextField
            label="Fraud Detection API Token"
            type={showFraudApiToken ? "text" : "password"}
            value={fraudApiToken}
            onChange={(e) => setFraudApiToken(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowFraudApiToken((v) => !v)}
                    edge="end"
                  >
                    {showFraudApiToken ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
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
