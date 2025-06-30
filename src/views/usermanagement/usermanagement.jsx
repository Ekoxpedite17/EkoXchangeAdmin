import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';

import MainCard from '../../ui-component/cards/MainCard';
import UserSearchFilter from './components/UserSearchFilter';
import UserTable from './components/UserTable';
import UserDetailsDialog from './components/UserDetailsDialog';
import ConfirmationDialog from './components/ConfirmationDialog';

import { gridSpacing } from '../../store/constant';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchUsers } from '../../redux/reducers/users.reducer';
import { EkoServices_Admin } from '../../services';

const UserManagement = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    kycStatus: '',
    accountStatus: '',
    dateFrom: '',
    dateTo: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    message: '',
    action: null
  });
  const [userWalletBalances, setUserWalletBalances] = useState(null);
  const [walletLoading, setWalletLoading] = useState(false);
  const dispatch = useAppDispatch();
  const listofUsers = useAppSelector((state) => state.user.users);
  const [confirmActionLoader, setConfirmActionLoader] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers({ limit: 30, skip: 0 }));
  }, []);

  useEffect(() => {
    let result = [...listofUsers];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (user) => (user.firstname && user.firstname.toLowerCase().includes(term)) || (user.email && user.email.toLowerCase().includes(term))
      );
    }

    if (filterOptions.kycStatus) {
      result = result.filter((user) => user.kycStatus === filterOptions.kycStatus);
    }

    if (filterOptions.accountStatus) {
      result = result.filter((user) => user.accountStatus === filterOptions.accountStatus);
    }

    if (filterOptions.dateFrom) {
      result = result.filter((user) => new Date(user.dateRegistered) >= new Date(filterOptions.dateFrom));
    }

    if (filterOptions.dateTo) {
      result = result.filter((user) => new Date(user.dateRegistered) <= new Date(filterOptions.dateTo));
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
      [event.target.name]: event.target.value
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const resetFilters = () => {
    setFilterOptions({
      kycStatus: '',
      accountStatus: '',
      dateFrom: '',
      dateTo: ''
    });
    setSearchTerm('');
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setUserDialogOpen(true);
    setUserWalletBalances(null); // Reset wallet balances when opening dialog
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    
    // Fetch wallet balances when switching to wallet tab
    if (newValue === 3 && selectedUser && !userWalletBalances) {
      fetchUserWalletBalances(selectedUser.id);
    }
  };

  const handleCloseUserDialog = () => {
    setUserDialogOpen(false);
    setSelectedUser(null);
    setTabValue(0);
    setUserWalletBalances(null);
  };

  const fetchUserWalletBalances = async (userId) => {
    setWalletLoading(true);
    try {
      const response = await EkoServices_Admin.getUserWalletBalances(userId);
      setUserWalletBalances(response.balances || []);
    } catch (error) {
      console.error('Error fetching user wallet balances:', error);
      setUserWalletBalances([]);
    } finally {
      setWalletLoading(false);
    }
  };

  const handleKycAction = (action, documentId) => {
    console.log(`${action} document ${documentId}`);
    setConfirmDialog({ open: false, title: '', message: '', action: null });

    if (selectedUser) {
      const updatedUsers = listofUsers.map((user) => {
        if (user.id === selectedUser.id) {
          return {
            ...user,
            kycStatus: action === 'approve' ? 'Approved' : 'Rejected'
          };
        }
        return user;
      });

      setUsers(updatedUsers);
      setSelectedUser({
        ...selectedUser,
        kycStatus: action === 'approve' ? 'Approved' : 'Rejected'
      });
    }
  };

  const handleAccountStatusChange = async (action) => {
    console.log(`${action} account for user ${selectedUser?.id}`);

    if (selectedUser) {
      let newStatus = 'Active';

      switch (action) {
        case 'lock':
          newStatus = 'Locked';
          setConfirmActionLoader(true);
          const lock = await EkoServices_Admin.deActivateUser(selectedUser.id);
          if (lock?.message === 'success') {
            setConfirmActionLoader(false);
            dispatch(fetchUsers({ limit: 30, skip: 0 }));
            setConfirmDialog({ open: false, title: '', message: '', action: null });
            setUserDialogOpen(false);
          } else {
            setConfirmActionLoader(false);
          }
          break;
        case 'suspend':
          newStatus = 'Suspended';
          setConfirmActionLoader(true);
          const suspend = await EkoServices_Admin.deActivateUser(selectedUser.id);
          if (suspend?.message === 'success') {
            setConfirmActionLoader(false);
            dispatch(fetchUsers({ limit: 30, skip: 0 }));
            setConfirmDialog({ open: false, title: '', message: '', action: null });
            setUserDialogOpen(false);
          } else {
            setConfirmActionLoader(false);
          }
          break;
        case 'reactivate':
          newStatus = 'Active';
          setConfirmActionLoader(true);
          const activate = await EkoServices_Admin.activateUser(selectedUser.id);
          if (activate?.message === 'success') {
            setConfirmActionLoader(false);
            dispatch(fetchUsers({ limit: 30, skip: 0 }));
            setConfirmDialog({ open: false, title: '', message: '', action: null });
            setUserDialogOpen(false);
          } else {
            setConfirmActionLoader(false);
          }
          break;
        default:
          newStatus = 'Active';
      }

      const updatedUsers = listofUsers.map((user) => {
        if (user.id === selectedUser.id) {
          return {
            ...user,
            accountStatus: newStatus
          };
        }
        return user;
      });

      setUsers(updatedUsers);
      setSelectedUser({
        ...selectedUser,
        accountStatus: newStatus
      });
    }
  };

  const handleSecurityReset = async (type) => {
    switch (type) {
      case 'password':
        setConfirmActionLoader(true);
        const password = await EkoServices_Admin.resetUserPassword({
          id: selectedUser.id
        });
        if (password?.message.includes('Password reset successfully and new password generated')) {
          setConfirmActionLoader(false);
          dispatch(fetchUsers({ limit: 30, skip: 0 }));
          setConfirmDialog({ open: false, title: '', message: '', action: null });
          setUserDialogOpen(false);
        } else {
          setConfirmActionLoader(false);
        }
        break;
      case '2fa':
        setConfirmActionLoader(true);
        const twofa = await EkoServices_Admin.reset2fa({
          id: selectedUser.id
        });
        if (twofa?.message.includes('2FA reset successfully')) {
          setConfirmActionLoader(false);
          dispatch(fetchUsers({ limit: 30, skip: 0 }));
          setConfirmDialog({ open: false, title: '', message: '', action: null });
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
      action
    });
  };

  const getUserKycDocuments = (userId) => {
    return [];
  };

  const getUserApprovalLogs = (userId) => {
    return [];
  };

  return (
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
          <UserTable
            filteredUsers={filteredUsers}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleViewUser={handleViewUser}
          />
        </Grid>
      </Grid>

      <UserDetailsDialog
        open={userDialogOpen}
        onClose={handleCloseUserDialog}
        user={selectedUser}
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        kycDocuments={selectedUser ? [] : []}
        approvalLogs={selectedUser ? [] : []}
        openConfirmDialog={openConfirmDialog}
        handleKycAction={handleKycAction}
        handleAccountStatusChange={handleAccountStatusChange}
        handleSecurityReset={handleSecurityReset}
        userWalletBalances={userWalletBalances}
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
  );
};

export default UserManagement;
