import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  Chip,
  Alert,
  Snackbar,
  Tab,
  Tabs,
  Badge,
} from "@mui/material";
import { Edit, Delete, Add, Save, Warning, Info, Block } from "@mui/icons-material";

// Mock data for initial roles
const initialRoles = [
  { id: 1, name: "Super Admin", description: "Full system access", isSystem: true, adminCount: 1 },
  { id: 2, name: "Finance Manager", description: "Manages financial operations", isSystem: false, adminCount: 2 },
  { id: 3, name: "Support Agent", description: "Handles customer support", isSystem: false, adminCount: 3 },
];

// Mock data for admin users
const initialAdmins = [
  { id: 1, email: "superadmin@example.com", name: "John Doe", roleId: 1, isCurrentUser: true },
  { id: 2, email: "finance@example.com", name: "Jane Smith", roleId: 2, isCurrentUser: false },
  { id: 3, email: "support1@example.com", name: "Mike Johnson", roleId: 3, isCurrentUser: false },
  { id: 4, email: "support2@example.com", name: "Sarah Williams", roleId: 3, isCurrentUser: false },
  { id: 5, email: "finance2@example.com", name: "Robert Brown", roleId: 2, isCurrentUser: false },
];

// Comprehensive list of modules/features
const modules = [
  { key: "dashboard", label: "Dashboard" },
  { key: "users", label: "User Management" },
  { key: "orders", label: "Orders" },
  { key: "transactions", label: "Transactions" },
  { key: "wallets", label: "Wallets" },
  { key: "reports", label: "Reports" },
  { key: "settings", label: "Settings" },
];

// Comprehensive list of permissions per module
const permissionActions = ["View", "Create", "Edit", "Delete", "Export", "Approve"];

// Function to generate default permission matrix
const generateDefaultMatrix = (roles) => {
  const matrix = {};
  modules.forEach((module) => {
    matrix[module.key] = {};
    roles.forEach((role) => {
      matrix[module.key][role.id] = {};
      permissionActions.forEach((action) => {
        // Super Admin has all permissions by default
        matrix[module.key][role.id][action] = role.name === "Super Admin";
      });
    });
  });
  return matrix;
};

// Mock audit log entries
const initialAuditLog = [
  {
    id: 1,
    action: "Role Created",
    details: "Created role 'Finance Manager'",
    admin: "John Doe",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 2,
    action: "Permission Changed",
    details: "Enabled 'Approve' for 'Transactions' module for 'Finance Manager'",
    admin: "John Doe",
    timestamp: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: 3,
    action: "Role Assigned",
    details: "Assigned 'Support Agent' role to 'support2@example.com'",
    admin: "John Doe",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
];

export default function UserRoleConfig() {
  // State for roles management
  const [roles, setRoles] = useState(initialRoles);
  const [editingRole, setEditingRole] = useState(null);
  const [roleFormOpen, setRoleFormOpen] = useState(false);
  const [roleForm, setRoleForm] = useState({ name: "", description: "" });
  const [roleFormErrors, setRoleFormErrors] = useState({});
  
  // State for permissions matrix
  const [permissionMatrix, setPermissionMatrix] = useState(() => generateDefaultMatrix(initialRoles));
  const [selectedRoleForPermissions, setSelectedRoleForPermissions] = useState(null);
  
  // State for admin role assignment
  const [admins, setAdmins] = useState(initialAdmins);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [assignRoleDialogOpen, setAssignRoleDialogOpen] = useState(false);
  
  // State for audit log
  const [auditLog, setAuditLog] = useState(initialAuditLog);
  
  // UI state
  const [activeTab, setActiveTab] = useState(0);
  const [alertInfo, setAlertInfo] = useState({ open: false, message: "", severity: "success" });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, title: "", message: "", action: null });
  const [isSuperAdmin, setIsSuperAdmin] = useState(true); // Mock - would come from auth context
  
  // Initialize selected role for permissions
  useEffect(() => {
    if (roles.length > 0 && !selectedRoleForPermissions) {
      setSelectedRoleForPermissions(roles[0].id);
    }
  }, [roles, selectedRoleForPermissions]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Show alert message
  const showAlert = (message, severity = "success") => {
    setAlertInfo({ open: true, message, severity });
  };

  // Close alert
  const handleCloseAlert = () => {
    setAlertInfo({ ...alertInfo, open: false });
  };

  // Add audit log entry
  const addAuditLog = (action, details) => {
    const newLog = {
      id: auditLog.length + 1,
      action,
      details,
      admin: "John Doe", // Would come from auth context
      timestamp: new Date().toISOString(),
    };
    setAuditLog([newLog, ...auditLog]);
  };

  // ===== ROLE MANAGEMENT FUNCTIONS =====
  
  // Open role form for creating/editing
  const openRoleForm = (role = null) => {
    if (role) {
      setEditingRole(role.id);
      setRoleForm({ name: role.name, description: role.description || "" });
    } else {
      setEditingRole(null);
      setRoleForm({ name: "", description: "" });
    }
    setRoleFormErrors({});
    setRoleFormOpen(true);
  };

  // Close role form
  const closeRoleForm = () => {
    setRoleFormOpen(false);
    setEditingRole(null);
    setRoleForm({ name: "", description: "" });
  };

  // Handle role form input change
  const handleRoleFormChange = (e) => {
    const { name, value } = e.target;
    setRoleForm({ ...roleForm, [name]: value });
    // Clear error when user types
    if (roleFormErrors[name]) {
      setRoleFormErrors({ ...roleFormErrors, [name]: "" });
    }
  };

  // Validate role form
  const validateRoleForm = () => {
    const errors = {};
    if (!roleForm.name.trim()) {
      errors.name = "Role name is required";
    } else if (
      roles.some(
        (r) => r.name.toLowerCase() === roleForm.name.toLowerCase() && r.id !== editingRole
      )
    ) {
      errors.name = "Role name must be unique";
    }
    setRoleFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save role (create or update)
  const saveRole = () => {
    if (!validateRoleForm()) return;

    if (editingRole) {
      // Update existing role
      const updatedRoles = roles.map((r) =>
        r.id === editingRole ? { ...r, ...roleForm } : r
      );
      setRoles(updatedRoles);
      addAuditLog("Role Updated", `Updated role '${roleForm.name}'`);
      showAlert(`Role '${roleForm.name}' updated successfully`);
    } else {
      // Create new role
      const newRole = {
        id: Math.max(0, ...roles.map((r) => r.id)) + 1,
        name: roleForm.name,
        description: roleForm.description,
        isSystem: false,
        adminCount: 0,
      };
      setRoles([...roles, newRole]);
      
      // Update permission matrix for the new role
      setPermissionMatrix((prev) => {
        const updated = { ...prev };
        modules.forEach((module) => {
          updated[module.key][newRole.id] = {};
          permissionActions.forEach((action) => {
            updated[module.key][newRole.id][action] = false;
          });
        });
        return updated;
      });
      
      addAuditLog("Role Created", `Created role '${roleForm.name}'`);
      showAlert(`Role '${roleForm.name}' created successfully`);
    }
    closeRoleForm();
  };

  // Confirm role deletion
  const confirmDeleteRole = (role) => {
    if (role.isSystem) {
      showAlert("System roles cannot be deleted", "error");
      return;
    }
    
    if (role.adminCount > 0) {
      setConfirmDialog({
        open: true,
        title: "Cannot Delete Role",
        message: `This role is assigned to ${role.adminCount} admin(s). Please reassign them before deleting this role.`,
        action: null,
      });
      return;
    }
    
    setConfirmDialog({
      open: true,
      title: "Confirm Deletion",
      message: `Are you sure you want to delete the role '${role.name}'? This action cannot be undone.`,
      action: () => deleteRole(role),
    });
  };

  // Delete role
  const deleteRole = (role) => {
    setRoles(roles.filter((r) => r.id !== role.id));
    
    // Remove role from permission matrix
    setPermissionMatrix((prev) => {
      const updated = { ...prev };
      modules.forEach((module) => {
        delete updated[module.key][role.id];
      });
      return updated;
    });
    
    addAuditLog("Role Deleted", `Deleted role '${role.name}'`);
    showAlert(`Role '${role.name}' deleted successfully`);
  };

  // ===== PERMISSIONS MATRIX FUNCTIONS =====
  
  // Handle permission checkbox change
  const handlePermissionChange = (moduleKey, roleId, action) => {
    setPermissionMatrix((prev) => {
      const role = roles.find(r => r.id === roleId);
      const module = modules.find(m => m.key === moduleKey);
      
      // Don't allow changing Super Admin core permissions
      if (role.name === "Super Admin" && [
        "dashboard", "users", "settings"
      ].includes(moduleKey)) {
        showAlert("Cannot modify core Super Admin permissions", "warning");
        return prev;
      }
      
      const newValue = !prev[moduleKey][roleId][action];
      const updated = {
        ...prev,
        [moduleKey]: {
          ...prev[moduleKey],
          [roleId]: {
            ...prev[moduleKey][roleId],
            [action]: newValue,
          },
        },
      };
      
      // Log the permission change
      addAuditLog(
        "Permission Changed",
        `${newValue ? "Enabled" : "Disabled"} '${action}' for '${module.label}' module for '${role.name}'`
      );
      
      return updated;
    });
  };

  // Save permissions
  const savePermissions = () => {
    // Here you would call your API to save the permission matrix
    showAlert("Permissions saved successfully");
    // In a real app, you might want to validate that at least one permission is granted
  };

  // ===== ROLE ASSIGNMENT FUNCTIONS =====
  
  // Open assign role dialog
  const openAssignRoleDialog = (admin) => {
    if (admin.isCurrentUser) {
      showAlert("You cannot change your own role", "error");
      return;
    }
    setSelectedAdmin(admin);
    setAssignRoleDialogOpen(true);
  };

  // Close assign role dialog
  const closeAssignRoleDialog = () => {
    setAssignRoleDialogOpen(false);
    setSelectedAdmin(null);
  };

  // Assign role to admin
  const assignRole = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    const prevRole = roles.find(r => r.id === selectedAdmin.roleId);
    
    // Update admin's role
    setAdmins(admins.map(a => 
      a.id === selectedAdmin.id ? { ...a, roleId } : a
    ));
    
    // Update role admin counts
    setRoles(roles.map(r => {
      if (r.id === prevRole.id) {
        return { ...r, adminCount: r.adminCount - 1 };
      }
      if (r.id === roleId) {
        return { ...r, adminCount: r.adminCount + 1 };
      }
      return r;
    }));
    
    addAuditLog(
      "Role Assigned",
      `Changed role for '${selectedAdmin.email}' from '${prevRole.name}' to '${role.name}'`
    );
    
    showAlert(`Role assigned successfully to ${selectedAdmin.email}`);
    closeAssignRoleDialog();
  };

  // ===== RENDER FUNCTIONS =====
  
  // Render role management tab
  const renderRoleManagement = () => (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          Available Roles
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => openRoleForm()}
          disabled={!isSuperAdmin}
        >
          Create New Role
        </Button>
      </Box>
      
      <TableContainer component={Paper} sx={{ boxShadow: "none", bgcolor: "transparent", mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Role Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center">Admins</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>
                  {role.name}
                  {role.isSystem && (
                    <Chip
                      size="small"
                      label="System"
                      color="primary"
                      variant="outlined"
                      sx={{ ml: 1 }}
                    />
                  )}
                </TableCell>
                <TableCell>{role.description || "--"}</TableCell>
                <TableCell align="center">{role.adminCount}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit Role">
                    <IconButton
                      size="small"
                      onClick={() => openRoleForm(role)}
                      disabled={!isSuperAdmin}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={role.isSystem ? "System roles cannot be deleted" : "Delete Role"}>
                    <span>
                      <IconButton
                        size="small"
                        onClick={() => confirmDeleteRole(role)}
                        disabled={!isSuperAdmin || role.isSystem}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
          Recent Role Activity
        </Typography>
        <TableContainer component={Paper} sx={{ boxShadow: "none", bgcolor: "transparent" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auditLog.filter(log => [
                "Role Created", "Role Updated", "Role Deleted"
              ].includes(log.action)).slice(0, 5).map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.details}</TableCell>
                  <TableCell>{log.admin}</TableCell>
                  <TableCell>
                    {new Date(log.timestamp).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );

  // Render permissions matrix tab
  const renderPermissionsMatrix = () => {
    const selectedRole = roles.find(r => r.id === selectedRoleForPermissions);
    if (!selectedRole) return null;
    
    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mr: 2 }}>
              Permissions for:
            </Typography>
            <TextField
              select
              value={selectedRoleForPermissions}
              onChange={(e) => setSelectedRoleForPermissions(Number(e.target.value))}
              size="small"
              sx={{ minWidth: 200 }}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Save />}
            onClick={savePermissions}
            disabled={!isSuperAdmin}
          >
            Save Permissions
          </Button>
        </Box>
        
        {selectedRole.name === "Super Admin" && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Super Admin has full access to all system features. Core permissions cannot be modified.
          </Alert>
        )}
        
        <TableContainer component={Paper} sx={{ boxShadow: "none", bgcolor: "transparent" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Module</TableCell>
                {permissionActions.map((action) => (
                  <TableCell key={action} align="center">
                    {action}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {modules.map((module) => (
                <TableRow key={module.key}>
                  <TableCell>{module.label}</TableCell>
                  {permissionActions.map((action) => {
                    const isCore = selectedRole.name === "Super Admin" && [
                      "dashboard", "users", "settings"
                    ].includes(module.key);
                    
                    return (
                      <TableCell key={action} align="center">
                        <Checkbox
                          checked={!!permissionMatrix[module.key][selectedRoleForPermissions][action]}
                          onChange={() => handlePermissionChange(module.key, selectedRoleForPermissions, action)}
                          disabled={!isSuperAdmin || isCore}
                          color="primary"
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
            Recent Permission Changes
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: "none", bgcolor: "transparent" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {auditLog.filter(log => log.action === "Permission Changed").slice(0, 5).map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.details}</TableCell>
                    <TableCell>{log.admin}</TableCell>
                    <TableCell>
                      {new Date(log.timestamp).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  };

  // Render role assignment tab
  const renderRoleAssignment = () => (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          Assign Roles to Admin Users
        </Typography>
        {!isSuperAdmin && (
          <Alert severity="warning" sx={{ mt: 1 }}>
            Only Super Admins can assign roles to other admins.
          </Alert>
        )}
      </Box>
      
      <TableContainer component={Paper} sx={{ boxShadow: "none", bgcolor: "transparent" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Admin User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Current Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((admin) => {
              const role = roles.find(r => r.id === admin.roleId);
              return (
                <TableRow key={admin.id}>
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={role?.name || "No Role"}
                      color={role?.name === "Super Admin" ? "primary" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={admin.isCurrentUser ? "You cannot change your own role" : "Change Role"}>
                      <span>
                        <IconButton
                          size="small"
                          onClick={() => openAssignRoleDialog(admin)}
                          disabled={!isSuperAdmin || admin.isCurrentUser}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
          Recent Role Assignments
        </Typography>
        <TableContainer component={Paper} sx={{ boxShadow: "none", bgcolor: "transparent" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auditLog.filter(log => log.action === "Role Assigned").slice(0, 5).map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.details}</TableCell>
                  <TableCell>{log.admin}</TableCell>
                  <TableCell>
                    {new Date(log.timestamp).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );

  return (
    <Card sx={{ bgcolor: "white", boxShadow: "none", borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          User Role & Permissions Management
        </Typography>
        
        {!isSuperAdmin && (
          <Alert severity="error" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Unauthorized Access:</strong> Only Super Admins can manage roles and permissions.
            </Typography>
          </Alert>
        )}
        
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="role management tabs">
            <Tab 
              label={
                <Badge badgeContent={roles.length} color="primary">
                  <Box sx={{ pr: 2 }}>Role Management</Box>
                </Badge>
              } 
              id="tab-0" 
              aria-controls="tabpanel-0" 
            />
            <Tab label="Permissions Matrix" id="tab-1" aria-controls="tabpanel-1" />
            <Tab 
              label={
                <Badge badgeContent={admins.length} color="primary">
                  <Box sx={{ pr: 2 }}>Assign Roles</Box>
                </Badge>
              } 
              id="tab-2" 
              aria-controls="tabpanel-2" 
            />
          </Tabs>
        </Box>
        
        <Box role="tabpanel" hidden={activeTab !== 0} id="tabpanel-0" aria-labelledby="tab-0">
          {activeTab === 0 && renderRoleManagement()}
        </Box>
        <Box role="tabpanel" hidden={activeTab !== 1} id="tabpanel-1" aria-labelledby="tab-1">
          {activeTab === 1 && renderPermissionsMatrix()}
        </Box>
        <Box role="tabpanel" hidden={activeTab !== 2} id="tabpanel-2" aria-labelledby="tab-2">
          {activeTab === 2 && renderRoleAssignment()}
        </Box>
      </CardContent>
      
      {/* Role Form Dialog */}
      <Dialog open={roleFormOpen} onClose={closeRoleForm} maxWidth="sm" fullWidth>
        <DialogTitle>{editingRole ? "Edit Role" : "Create New Role"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Role Name"
            type="text"
            fullWidth
            value={roleForm.name}
            onChange={handleRoleFormChange}
            error={!!roleFormErrors.name}
            helperText={roleFormErrors.name}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description (Optional)"
            type="text"
            fullWidth
            multiline
            rows={2}
            value={roleForm.description}
            onChange={handleRoleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRoleForm}>Cancel</Button>
          <Button onClick={saveRole} variant="contained" color="primary">
            {editingRole ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Assign Role Dialog */}
      <Dialog open={assignRoleDialogOpen} onClose={closeAssignRoleDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Assign Role</DialogTitle>
        <DialogContent>
          {selectedAdmin && (
            <>
              <DialogContentText>
                Select a role to assign to <strong>{selectedAdmin.email}</strong>
              </DialogContentText>
              <Box sx={{ mt: 2 }}>
                {roles.map((role) => (
                  <Button
                    key={role.id}
                    variant={role.id === selectedAdmin.roleId ? "contained" : "outlined"}
                    color={role.id === selectedAdmin.roleId ? "primary" : "inherit"}
                    onClick={() => assignRole(role.id)}
                    fullWidth
                    sx={{ mb: 1, justifyContent: "flex-start", textAlign: "left" }}
                  >
                    {role.name}
                    {role.description && (
                      <Typography variant="caption" sx={{ ml: 1, color: "text.secondary" }}>
                        - {role.description}
                      </Typography>
                    )}
                  </Button>
                ))}
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAssignRoleDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
      
      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}>
        <DialogTitle>{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmDialog.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}>Cancel</Button>
          {confirmDialog.action && (
            <Button onClick={() => {
              confirmDialog.action();
              setConfirmDialog({ ...confirmDialog, open: false });
            }} color="error" variant="contained" autoFocus>
              Confirm
            </Button>
          )}
        </DialogActions>
      </Dialog>
      
      {/* Alert Snackbar */}
      <Snackbar
        open={alertInfo.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseAlert} severity={alertInfo.severity} sx={{ width: "100%" }}>
          {alertInfo.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}
