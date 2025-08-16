import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "./reducers/auth.reducer";
import userReducer from "./reducers/users.reducer";
import rolesReducer from "./reducers/roles.reducer";
import settingsReducer from "./reducers/settings.reducer";
import { useDispatch, useSelector } from "react-redux";

const authPersistConfig = {
  key: "auth",
  storage,
};

const settingsPersistConfig = {
  key: "settings",
  storage,
  whitelist: [
    "general",
    "security",
    "notifications",
    "rateManagement",
    "apiIntegrations",
    "userRoles",
    "loggingAudit",
    "adBanners",
  ],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedSettingsReducer = persistReducer(
  settingsPersistConfig,
  settingsReducer
);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    user: userReducer,
    roles: rolesReducer,
    settings: persistedSettingsReducer,
  },
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const persistor = persistStore(store);
export default store;
