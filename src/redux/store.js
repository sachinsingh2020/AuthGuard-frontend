import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { blogReducer } from './reducers/blogReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        blog: blogReducer,
    }
})

export default store

// export const server = 'https://albearoti-assesment.vercel.app/api/v1';
export const server = 'http://localhost:4000/api/v1';

// sachin 
