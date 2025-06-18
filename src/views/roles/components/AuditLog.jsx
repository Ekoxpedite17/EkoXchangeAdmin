import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const AuditLog = ({ roleId }) => {
  const logs = [
    {
      id: 1,
      action: 'Permission Updated',
      role: 'Support Agent',
      admin: 'John Doe',
      timestamp: '2024-01-20 14:30',
      details: 'Added transaction_approve permission'
    },
    {
      id: 2,
      action: 'Role Status Changed',
      role: 'Compliance Officer',
      admin: 'Jane Smith',
      timestamp: '2024-01-20 14:25',
      details: 'Role activated'
    }
  ];

  const filteredLogs = roleId ? logs.filter((log) => log.role === roleId) : logs;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Action</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.role}</TableCell>
              <TableCell>{log.admin}</TableCell>
              <TableCell>{log.timestamp}</TableCell>
              <TableCell>{log.details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AuditLog;
