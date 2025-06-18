import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './reducers/auth.reducer';
import userReducer from './reducers/users.reducer';
import rolesReducer from './reducers/roles.reducer';
import { useDispatch, useSelector } from 'react-redux';

const persistConfig = {
  key: 'auth',
  storage
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    user: userReducer,
    roles: rolesReducer
  }
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const persistor = persistStore(store);
export default store;
