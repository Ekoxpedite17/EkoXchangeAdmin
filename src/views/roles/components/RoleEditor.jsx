import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Box,
  Chip,
  Stack
} from '@mui/material';

const RoleEditor = ({ open, role, onClose }) => {
  if (!role) return null;

  const permissions = [
    'user_management',
    'transaction_view',
    'transaction_approve',
    'support_tickets',
    'compliance_view',
    'compliance_action',
    'reports_view',
    'system_settings'
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Role - {role.name}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField fullWidth label="Role Name" defaultValue={role.name} />
          <TextField fullWidth label="Description" multiline rows={2} defaultValue={role.description} />
          <Box>
            <Box sx={{ mb: 1 }}>Permissions</Box>
            {permissions.map((perm) => (
              <FormControlLabel
                key={perm}
                control={<Switch defaultChecked={role.permissions ? role.permissions.includes(perm) : false} />}
                label={perm}
              />
            ))}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoleEditor;
