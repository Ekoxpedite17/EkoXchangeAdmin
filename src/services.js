import axiosInstance from "./api/axios";

const EkoServices_Auth = {
  login: async (payload) => {
    try {
      const response = await axiosInstance.post("/admin/auth/login", payload, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },
};

const EkoServices_Admin = {
  getUsers: async ({ limit = 30, skip = 0 }) => {
    try {
      const response = await axiosInstance.get(
        `/dashboard/admin/wallet-users/get?skip=${skip}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      return response.data.users;
    } catch (error) {
      console.error("Get admins failed:", error);
      throw error;
    }
  },

  getSingleAdmin: async (id) => {
    try {
      const response = await axiosInstance.get(
        `/dashboard/admin/super-admin/get/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Get single admin failed:", error);
      throw error;
    }
  },

  activateUser: async (id) => {
    try {
      const response = await axiosInstance.put(
        `/dashboard/admin/admin-user/activate/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Activate user failed:", error);
      throw error;
    }
  },

  resetUserPassword: async (param) => {
    try {
      const response = await axiosInstance.post(
        `/dashboard/admin/admin-user/reset-password`,
        param,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Reset user password failed:", error);
      throw error;
    }
  },

  reset2fa: async (param) => {
    try {
      const response = await axiosInstance.post(
        `/dashboard/admin/admin-user/reset-2fa`,
        param,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Reset 2FA failed:", error);
      throw error;
    }
  },

  deActivateUser: async (id) => {
    try {
      const response = await axiosInstance.put(
        `/dashboard/admin/admin-user/deactivate/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Deactivate user failed:", error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/dashboard/admin/super-admin/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Delete user failed:", error);
      throw error;
    }
  },

  getUserWalletBalances: async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/dashboard/admin/wallet-users/${userId}/get/`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Get user wallet balances failed:", error);
      throw error;
    }
  },

  getAdmins: async () => {
    try {
      const response = await axiosInstance.get(
        "/dashboard/admin/admin-users/get",
        {
          withCredentials: true,
        }
      );
      return response?.data?.users;
    } catch (error) {
      console.error("Get admins failed:", error);
      throw error;
    }
  },

  getUserWalletTransactionHistory: async (userid) => {
    try {
      const response = await axiosInstance.get(
        `/dashboard/admin/user-transactions/${userid}/get`,
        {
          withCredentials: true,
        }
      );
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },
};

const EkoServices_Roles = {
  getRoles: async ({ skip = 0, limit = 30 }) => {
    try {
      const response = await axiosInstance.get(
        `/dashboard/roles/list?skip=${skip}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Get roles failed:", error);
      throw error;
    }
  },

  getSingleRole: async (id) => {
    try {
      const response = await axiosInstance.get(
        `/dashboard/admin/roles/get/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Get single role failed:", error);
      throw error;
    }
  },

  createRole: async (payload) => {
    try {
      const response = await axiosInstance.post(
        "/dashboard/admin/roles/create",
        payload,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Create role failed:", error);
      throw error;
    }
  },

  updateRole: async (id, payload) => {
    try {
      const response = await axiosInstance.put(
        `/dashboard/admin/roles/update/${id}`,
        payload,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Update role failed:", error);
      throw error;
    }
  },

  deleteRole: async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/dashboard/admin/roles/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Delete role failed:", error);
      throw error;
    }
  },
};

const EkoServices_Crypty = {
  getWalletLiveBalances: async () => {
    try {
      const response = await axiosInstance.get(
        `/admin/crypto-management/wallet-balances`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Get get live wallet failed:", error);
      throw error;
    }
  },

  refreshWalletBalances: async () => {
    try {
      const response = await axiosInstance.get(
        `/admin/crypto-management/wallet-balances`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Get refresh live wallet failed:", error);
      throw error;
    }
  },

  getRates: async () => {
    try {
      const response = await axiosInstance.get(
        `/admin/crypto-management/naira/rates`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Get rates failed:", error);
      throw error;
    }
  },

  updateRates: async (payload) => {
    try {
      const response = await axiosInstance.put(
        `/admin/crypto-management/naira/update-rates`,
        payload,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Update rates failed:", error);
      throw error;
    }
  },
};

const EkoServices_Transactions = {
  getTransactionList: async () => {
    try {
      const response = await axiosInstance.get(
        `/admin/transaction-management/get`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Get transaction list failed:", error);
      throw error;
    }
  },

  getBuyOrderQueue: async () => {
    try {
      const response = await axiosInstance.get(
        `admin/crypto-management/buy-order/list`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("failed to get buy order queue list", error);
    }
  },

  getSellOrderQueue: async ({ skip = 0, limit = 30 }) => {
    try {
      const response = await axiosInstance.get(`sell/list/${skip}/${limit}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log("failed to get sell order queue list", error);
    }
  },

  updateBuyOrderQueue: async (id, payload) => {
    try {
      const response = await axiosInstance.put(
        `/admin/crypto-management/buy-order/update/${id}`,
        payload,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("failed to update buy order queue", error);
    }
  },
};

const EkoServices_Disputes = {
  getDisputeList: async ({ limit = 30, skip = 0 }) => {
    try {
      const response = await axiosInstance.get(
        `/admin/support/disputes/list?skip=${skip}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Get dispute list failed:", error);
      throw error;
    }
  },

  createTicket: async (payload) => {
    try {
      const response = await axiosInstance.post(
        `/admin/support/ticket`,
        payload,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Create ticket failed:", error);
      throw error;
    }
  },

  escalateDispute: async (payload) => {
    try {
      const response = await axiosInstance.post(
        `/admin/support/dispute`,
        payload,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Escalate dispute failed:", error);
      throw error;
    }
  },

  resolveDispute: async (
    payload = {
      disputeId: "",
      decision: "",
    }
  ) => {
    try {
      const response = await axiosInstance.post(
        `/admin/support/resolution`,
        payload,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Resolve dispute failed:", error);
      throw error;
    }
  },

  exportDispute: async (id) => {
    try {
      const response = await axiosInstance.put(
        `/admin/dispute-management/export/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Export dispute failed:", error);
      throw error;
    }
  },
};

export {
  EkoServices_Auth,
  EkoServices_Admin,
  EkoServices_Roles,
  EkoServices_Crypty,
  EkoServices_Transactions,
  EkoServices_Disputes,
};
