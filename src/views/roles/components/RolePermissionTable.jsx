import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch, IconButton, Chip, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import { useAppSelector } from '../../../redux/store';

const RolePermissionTable = ({ onEdit, onAudit }) => {
  const { roles } = useAppSelector((state) => state.roles);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role._id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.description}</TableCell>
              <TableCell>
                {role.permissions
                  ? role.permissions.map((perm) => <Chip key={perm} label={perm} size="small" sx={{ mr: 0.5, mb: 0.5 }} />)
                  : 'N/A'}
              </TableCell>
              <TableCell>
                <Switch checked={role.active || false} />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(role)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onAudit(role)}>
                  <HistoryIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RolePermissionTable;
