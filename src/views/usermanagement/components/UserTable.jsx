import {
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import dayjs from "dayjs";

const kycStatusColors = {
  Approved: "success",
  Pending: "warning",
  Rejected: "error",
  "Not Submitted": "default",
};

const accountStatusColors = {
  Active: "success",
  Suspended: "error",
  Locked: "warning",
};

const UserTable = ({
  filteredUsers,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleViewUser,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="user management table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Date Registered</TableCell>
            <TableCell>KYC Status</TableCell>
            <TableCell>Account Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>
                  {user.firstname} {user.lastname}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {dayjs(user.createdAt).format("DD MM, YYYY")}
                </TableCell>
                <TableCell>
                  <Chip
                    label={"--"}
                    color={kycStatusColors[user.kycStatus]}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.isActive === true ? "Active" : "InActive"}
                    color={
                      accountStatusColors[
                        user.isActive === true ? "Active" : "InActive"
                      ]
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="View User Details">
                    <IconButton
                      color="primary"
                      onClick={() => handleViewUser(user)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          {filteredUsers.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No users found matching the criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default UserTable;
