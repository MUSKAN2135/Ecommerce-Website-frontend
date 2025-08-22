import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/userslice';
import orderReducer from '../redux/ordersslice';
import reviewReducer from '../redux/reviewslice';
import categoryReducer from '../redux/categoryslice';
import wishlistReducer from '../redux/wishlistslice';
import shippingReducer from '../redux/shippingslice';
import addtocartReducer from '../redux/addtocartslice';
import blogReducer from '../redux/blogslice';
import productReducer from '../redux/productslice'


export const store = configureStore({
    reducer: {
        users: userReducer,
        products: productReducer,
        orders: orderReducer,
        reviews: reviewReducer,
        shipping: shippingReducer,
        cart: addtocartReducer,
        wishlist: wishlistReducer,
        categories: categoryReducer,
        blog: blogReducer
    },
});
