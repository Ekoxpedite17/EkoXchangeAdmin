import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Box,
  Paper
} from "@mui/material";

const features = [
  { key: "viewUser", label: "View User Info" },
  { key: "approveWithdrawal", label: "Approve Withdrawal" },
  { key: "resolveDisputes", label: "Resolve Disputes" },
];
const roles = ["Admin", "Support", "Compliance"];
const defaultMatrix = {
  viewUser: { Admin: true, Support: true, Compliance: true },
  approveWithdrawal: { Admin: true, Support: false, Compliance: true },
  resolveDisputes: { Admin: true, Support: false, Compliance: true },
};

export default function UserRoleConfig() {
  const [matrix, setMatrix] = useState(defaultMatrix);
  const [saving, setSaving] = useState(false);

  const handleCheck = (feature, role) => {
    setMatrix(prev => ({
      ...prev,
      [feature]: { ...prev[feature], [role]: !prev[feature][role] }
    }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      // Here you would call your API to save settings
      alert("Role configuration saved!");
    }, 1000);
  };

  return (
    <Card sx={{ bgcolor: "white", boxShadow: "none", borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          User Role Configuration
        </Typography>
        <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: 'transparent' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Feature</TableCell>
                {roles.map(role => (
                  <TableCell key={role} align="center">{role}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {features.map(feature => (
                <TableRow key={feature.key}>
                  <TableCell>{feature.label}</TableCell>
                  {roles.map(role => (
                    <TableCell key={role} align="center">
                      <Checkbox
                        checked={!!matrix[feature.key][role]}
                        onChange={() => handleCheck(feature.key, role)}
                        color="primary"
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
      </CardContent>
    </Card>
  );
} 