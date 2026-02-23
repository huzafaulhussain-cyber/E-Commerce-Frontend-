import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { authReducer } from './Auth/Reducer';
import { customerProductReducer } from './product/Reducer';
import { cartReducer } from './Cart/Reducer';
import { orderReducer } from './Order/Reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { adminOrderReducer } from './Admin/Order/Reducer';
import { reviewReducer } from './review/Reducer';
import { ratingReducer } from './rating/Reducer';
import { adminUsersReducer } from './Admin/User/Reducer';
import { categoryReducer } from './Category/Reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    products: customerProductReducer,
    cart: cartReducer,
    order: orderReducer,
    adminOrder: adminOrderReducer,
    review: reviewReducer,
    rating: ratingReducer,
    adminUsers: adminUsersReducer,
    category: categoryReducer,

});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = legacy_createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);