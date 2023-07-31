import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authslice';
import { apiSlice } from './slices/apislice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;