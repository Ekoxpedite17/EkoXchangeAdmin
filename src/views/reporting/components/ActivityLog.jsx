import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';

const ActivityLog = () => {
  const activities = [
    {
      id: 1,
      admin: 'John Doe',
      action: 'Updated trade limits',
      timestamp: '2024-01-20 14:30',
      type: 'system'
    },
    {
      id: 2,
      admin: 'Jane Smith',
      action: 'Approved withdrawal',
      timestamp: '2024-01-20 14:25',
      type: 'transaction'
    }
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Admin</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell>{activity.admin}</TableCell>
              <TableCell>{activity.action}</TableCell>
              <TableCell>
                <Chip label={activity.type} color={activity.type === 'system' ? 'primary' : 'secondary'} size="small" />
              </TableCell>
              <TableCell>{activity.timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActivityLog;
