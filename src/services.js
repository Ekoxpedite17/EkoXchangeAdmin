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

export {
  EkoServices_Auth,
  EkoServices_Admin,
  EkoServices_Roles,
  EkoServices_Crypty,
};
