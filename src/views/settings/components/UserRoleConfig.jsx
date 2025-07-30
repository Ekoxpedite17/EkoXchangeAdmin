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
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";

const roles = ["Super Admin", "Sub-Admin", "Support Agent", "Finance Admin"];

const features = [
  { key: "buySell", label: "Buy/Sell" },
  { key: "users", label: "Users" },
  { key: "reports", label: "Reports" },
  { key: "settings", label: "Settings" },
];

const permissions = ["Create", "Read", "Update", "Delete"];

const defaultMatrix = {};
features.forEach((feature) => {
  defaultMatrix[feature.key] = {};
  roles.forEach((role) => {
    defaultMatrix[feature.key][role] = {};
    permissions.forEach((p) => {
      defaultMatrix[feature.key][role][p] = role === "Super Admin";
    });
  });
});

export default function UserRoleConfig() {
  const [matrix, setMatrix] = useState(defaultMatrix);
  const [saving, setSaving] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [adminRoleMap, setAdminRoleMap] = useState({});

  const handleCheck = (feature, role, permission) => {
    setMatrix((prev) => ({
      ...prev,
      [feature]: {
        ...prev[feature],
        [role]: {
          ...prev[feature][role],
          [permission]: !prev[feature][role][permission],
        },
      },
    }));
  };

  const handleAddRole = () => {
    if (!newRole || roles.includes(newRole)) return;
    roles.push(newRole);
    setMatrix(prev => {
      const updated = { ...prev };
      features.forEach(f => {
        updated[f.key][newRole] = {};
        permissions.forEach(p => {
          updated[f.key][newRole][p] = false;
        });
      });
      return updated;
    });
    setNewRole("");
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
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
          <TextField
            label="New Role Name"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            size="small"
          />
          <Button variant="outlined" onClick={handleAddRole} disabled={!newRole}>
            Add Role
          </Button>
        </Box>
        <TableContainer
          component={Paper}
          sx={{ boxShadow: "none", bgcolor: "transparent" }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Module</TableCell>
                <TableCell>Permission</TableCell>
                {roles.map((role) => (
                  <TableCell key={role} align="center">
                    {role}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {features.map((feature) =>
                permissions.map((permission) => (
                  <TableRow key={`${feature.key}-${permission}`}>
                    <TableCell>{feature.label}</TableCell>
                    <TableCell>{permission}</TableCell>
                    {roles.map((role) => (
                      <TableCell key={role} align="center">
                        <Checkbox
                          checked={!!matrix[feature.key][role][permission]}
                          onChange={() =>
                            handleCheck(feature.key, role, permission)
                          }
                          color="primary"
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
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
        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
            Assign Roles to Admin Users
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: "none", bgcolor: "transparent" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Admin User</TableCell>
                  <TableCell>Assigned Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {["admin1@example.com", "admin2@example.com"].map((admin) => (
                  <TableRow key={admin}>
                    <TableCell>{admin}</TableCell>
                    <TableCell>
                      <TextField
                        select
                        value={adminRoleMap[admin] || ""}
                        onChange={(e) =>
                          setAdminRoleMap({ ...adminRoleMap, [admin]: e.target.value })
                        }
                        size="small"
                        fullWidth
                      >
                        {roles.map((role) => (
                          <MenuItem key={role} value={role}>
                            {role}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
