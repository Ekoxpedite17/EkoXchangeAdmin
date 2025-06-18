import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from '@mui/material';

import RolePermissionTable from './components/RolePermissionTable';
import AuditLog from './components/AuditLog';
import RoleEditor from './components/RoleEditor';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchRoles } from '../../redux/reducers/roles.reducer';

const RolesPermissions = () => {
  const [editDialog, setEditDialog] = useState(false);
  const [auditDialog, setAuditDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchRoles({
        limit: 30,
        skip: 0
      })
    );
  }, []);

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setEditDialog(true);
  };

  const handleViewAudit = (role) => {
    setSelectedRole(role);
    setAuditDialog(true);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" gutterBottom>
        Roles & Permissions
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5">Role Management</Typography>
          </Stack>
          <RolePermissionTable onEdit={handleEditRole} onAudit={handleViewAudit} />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Recent Activity
          </Typography>
          <AuditLog />
        </CardContent>
      </Card>

      <RoleEditor open={editDialog} role={selectedRole} onClose={() => setEditDialog(false)} />

      <Dialog open={auditDialog} onClose={() => setAuditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Audit Trail - {selectedRole?.name}</DialogTitle>
        <DialogContent>
          <AuditLog roleId={selectedRole?.id} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAuditDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RolesPermissions;
