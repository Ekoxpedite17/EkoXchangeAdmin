import { useState, useEffect } from "react";
import {
  Grid,
  Box,
  CircularProgress,
  Typography,
  Skeleton,
  Backdrop,
} from "@mui/material";

import MainCard from "../../ui-component/cards/MainCard";
import UserSearchFilter from "./components/UserSearchFilter";
import UserTable from "./components/UserTable";
import UserDetailsDialog from "./components/UserDetailsDialog";
import ConfirmationDialog from "./components/ConfirmationDialog";

import { gridSpacing } from "../../store/constant";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchUsers } from "../../redux/reducers/users.reducer";
import { EkoServices_Admin } from "../../services";

const UserManagement = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    kycStatus: "",
    accountStatus: "",
    dateFrom: "",
    dateTo: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    message: "",
    action: null,
  });
  const [userWalletBalances, setUserWalletBalances] = useState(null);
  const [userTransactionHistory, setUserTransactionHistory] = useState([]);
  const [walletLoading, setWalletLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { users: listofUsers, loading } = useAppSelector((state) => state.user);
  const [confirmActionLoader, setConfirmActionLoader] = useState(false);
  const [userActivityLogs, setUserActivityLogs] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers({ limit: 30, skip: 0 }));
  }, []);

  useEffect(() => {
    let result = [...listofUsers];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          (user.firstname && user.firstname.toLowerCase().includes(term)) ||
          (user.email && user.email.toLowerCase().includes(term))
      );
    }

    if (filterOptions.kycStatus) {
      result = result.filter(
        (user) => user.kycStatus === filterOptions.kycStatus
      );
    }

    if (filterOptions.accountStatus) {
      result = result.filter(
        (user) => user.accountStatus === filterOptions.accountStatus
      );
    }

    if (filterOptions.dateFrom) {
      result = result.filter(
        (user) =>
          new Date(user.dateRegistered) >= new Date(filterOptions.dateFrom)
      );
    }

    if (filterOptions.dateTo) {
      result = result.filter(
        (user) =>
          new Date(user.dateRegistered) <= new Date(filterOptions.dateTo)
      );
    }

    setFilteredUsers(result);
  }, [listofUsers, searchTerm, filterOptions]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterOptions({
      ...filterOptions,
      [event.target.name]: event.target.value,
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const resetFilters = () => {
    setFilterOptions({
      kycStatus: "",
      accountStatus: "",
      dateFrom: "",
      dateTo: "",
    });
    setSearchTerm("");
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setUserDialogOpen(true);
    setUserWalletBalances(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);

    if (newValue === 3 && selectedUser && !userWalletBalances) {
      fetchUserWalletBalances(selectedUser.id);
    }

    if (newValue === 4 && selectedUser) {
      fetchUserWalletTransactionHistory(selectedUser.id);
    }

    if (newValue === 2 && selectedUser) {
      if (!Array.isArray(userActivityLogs)) {
        setUserActivityLogs([]);
      }
      getUserActivityLogs(selectedUser.id);
    }
  };

  const handleCloseUserDialog = () => {
    setUserDialogOpen(false);
    setSelectedUser(null);
    setTabValue(0);
    setUserWalletBalances(null);
    setUserTransactionHistory([]);
    setUserActivityLogs([]);
  };

  const fetchUserWalletBalances = async (userId) => {
    setWalletLoading(true);
    try {
      const response = await EkoServices_Admin.getUserWalletBalances(userId);
      setUserWalletBalances(response.balances || []);
    } catch (error) {
      console.error("Error fetching user wallet balances:", error);
      setUserWalletBalances([]);
    } finally {
      setWalletLoading(false);
    }
  };

  const fetchUserWalletTransactionHistory = async (userId) => {
    setWalletLoading(true);
    try {
      const response =
        await EkoServices_Admin.getUserWalletTransactionHistory(userId);
      if (response) {
        setUserTransactionHistory(response?.balances);
      }
    } catch (error) {
      console.error("Error fetching user transaction history:", error);
      setUserTransactionHistory([]);
    } finally {
      setWalletLoading(false);
    }
  };

  const handleKycAction = (action, documentId) => {
    console.log(`${action} document ${documentId}`);
    setConfirmDialog({ open: false, title: "", message: "", action: null });

    if (selectedUser) {
      const updatedUsers = listofUsers.map((user) => {
        if (user.id === selectedUser.id) {
          return {
            ...user,
            kycStatus: action === "approve" ? "Approved" : "Rejected",
          };
        }
        return user;
      });

      setUsers(updatedUsers);
      setSelectedUser({
        ...selectedUser,
        kycStatus: action === "approve" ? "Approved" : "Rejected",
      });
    }
  };

  const handleAccountStatusChange = async (action) => {
    console.log(`${action} account for user ${selectedUser?.id}`);

    if (selectedUser) {
      let newStatus = "Active";

      switch (action) {
        case "lock":
          newStatus = "Locked";
          setConfirmActionLoader(true);
          const lock = await EkoServices_Admin.deActivateUser(selectedUser.id);
          if (lock) {
            setConfirmActionLoader(false);
            dispatch(fetchUsers({ limit: 30, skip: 0 }));
            setConfirmDialog({
              open: false,
              title: "",
              message: "",
              action: null,
            });
            setUserDialogOpen(false);
          } else {
            setConfirmActionLoader(false);
          }
          break;
        case "suspend":
          newStatus = "Suspended";
          setConfirmActionLoader(true);
          const suspend = await EkoServices_Admin.deActivateUser(
            selectedUser.id
          );
          if (suspend) {
            setConfirmActionLoader(false);
            dispatch(fetchUsers({ limit: 30, skip: 0 }));
            setConfirmDialog({
              open: false,
              title: "",
              message: "",
              action: null,
            });
            setUserDialogOpen(false);
          } else {
            setConfirmActionLoader(false);
          }
          break;
        case "reactivate":
          newStatus = "Active";
          setConfirmActionLoader(true);
          const activate = await EkoServices_Admin.activateUser(
            selectedUser.id
          );
          if (activate) {
            setConfirmActionLoader(false);
            dispatch(fetchUsers({ limit: 30, skip: 0 }));
            setConfirmDialog({
              open: false,
              title: "",
              message: "",
              action: null,
            });
            setUserDialogOpen(false);
          } else {
            setConfirmActionLoader(false);
          }
          break;
        default:
          newStatus = "Active";
      }

      const updatedUsers = listofUsers.map((user) => {
        if (user.id === selectedUser.id) {
          return {
            ...user,
            accountStatus: newStatus,
          };
        }
        return user;
      });

      setUsers(updatedUsers);
      setSelectedUser({
        ...selectedUser,
        accountStatus: newStatus,
      });
    }
  };

  const handleSecurityReset = async (type) => {
    switch (type) {
      case "password":
        setConfirmActionLoader(true);
        const password = await EkoServices_Admin.resetUserPassword({
          id: selectedUser.id,
        });
        if (
          password?.message.includes(
            "Password reset successfully and new password generated"
          )
        ) {
          setConfirmActionLoader(false);
          dispatch(fetchUsers({ limit: 30, skip: 0 }));
          setConfirmDialog({
            open: false,
            title: "",
            message: "",
            action: null,
          });
          setUserDialogOpen(false);
        } else {
          setConfirmActionLoader(false);
        }
        break;
      case "2fa":
        setConfirmActionLoader(true);
        const twofa = await EkoServices_Admin.reset2fa(selectedUser.id);
        if (twofa?.message.includes("2FA reset successfully")) {
          setConfirmActionLoader(false);
          dispatch(fetchUsers({ limit: 30, skip: 0 }));
          setConfirmDialog({
            open: false,
            title: "",
            message: "",
            action: null,
          });
          setUserDialogOpen(false);
        } else {
          setConfirmActionLoader(false);
        }
        break;

      default:
        console.log(`Invalid reset type: ${type}`);
    }
  };

  const openConfirmDialog = (title, message, action) => {
    setConfirmDialog({
      open: true,
      title,
      message,
      action,
    });
  };

  const getUserKycDocuments = (userId) => {
    return [];
  };

  const getUserActivityLogs = async (userId) => {
    try {
      const logs = await EkoServices_Admin.getUserActivityLogs({
        userId,
        skip: 0,
        limit: 30,
      });

      if (Array.isArray(logs)) {
        setUserActivityLogs(logs);
      } else {
        console.warn("Activity logs is not an array:", logs);
        setUserActivityLogs([]);
      }
    } catch (error) {
      console.error("Error fetching activity logs:", error);
      setUserActivityLogs([]);
    }
  };

  // Loading skeleton for user table
  const UserTableSkeleton = () => (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="rectangular" width={120} height={40} />
      </Box>
      <Box>
        {[...Array(5)].map((_, index) => (
          <Box key={index} display="flex" gap={2} mb={2}>
            <Skeleton variant="rectangular" width="20%" height={60} />
            <Skeleton variant="rectangular" width="25%" height={60} />
            <Skeleton variant="rectangular" width="20%" height={60} />
            <Skeleton variant="rectangular" width="15%" height={60} />
            <Skeleton variant="rectangular" width="20%" height={60} />
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <>
      <MainCard title="User Management">
        <Grid container spacing={gridSpacing}>
          <Grid item size={12} display="flex" justifyContent="flex-end">
            <UserSearchFilter
              searchTerm={searchTerm}
              filterOptions={filterOptions}
              showFilters={showFilters}
              handleSearchChange={handleSearchChange}
              handleFilterChange={handleFilterChange}
              toggleFilters={toggleFilters}
              resetFilters={resetFilters}
            />
          </Grid>

          <Grid item size={12}>
            {loading ? (
              <UserTableSkeleton />
            ) : (
              <UserTable
                filteredUsers={filteredUsers}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleViewUser={handleViewUser}
              />
            )}
          </Grid>
        </Grid>

        <UserDetailsDialog
          open={userDialogOpen}
          onClose={handleCloseUserDialog}
          user={selectedUser}
          userTransactions={userTransactionHistory} // change this later
          transactionsLoading={false} // change this later
          tabValue={tabValue}
          handleTabChange={handleTabChange}
          kycDocuments={selectedUser ? [] : []}
          approvalLogs={selectedUser ? [] : []}
          openConfirmDialog={openConfirmDialog}
          handleKycAction={handleKycAction}
          handleAccountStatusChange={handleAccountStatusChange}
          handleSecurityReset={handleSecurityReset}
          userWalletBalances={userWalletBalances}
          walletLoading={walletLoading}
          userActivityLogs={userActivityLogs ?? []}
        />

        <ConfirmationDialog
          open={confirmDialog.open}
          title={confirmDialog.title}
          message={confirmDialog.message}
          selectedUser={selectedUser}
          onConfirm={confirmDialog.action}
          loading={confirmActionLoader}
          onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
        />
      </MainCard>

      {/* Global loading overlay for actions */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={confirmActionLoader}
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <CircularProgress color="inherit" />
          <Typography variant="h6" color="inherit">
            Processing your request...
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
};

export default UserManagement;
