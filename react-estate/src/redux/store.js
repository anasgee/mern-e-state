import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from "../redux/user/userSlice";
import {persistReducer,persistStore,FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,} from "redux-persist";
import storage from 'redux-persist/lib/storage';



const rootReducer= combineReducers({user:userReducer});
const persistConfig ={
    key:"root",
    version:1,
    storage,
}

const persistedReducer = persistReducer(persistConfig,rootReducer);




const store = configureStore({
    reducer:persistedReducer,
        middleware:(getDefaultMiddleware=>
            getDefaultMiddleware({
                serializableCheck: false,
            
                // {
                //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                //   },
            })
        
        )
})

export default store;

export const persistor = persistStore(store)

//Use middleware correctly for rendering anything
