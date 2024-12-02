import { createAction, createReducer } from '@reduxjs/toolkit';

const createBlogRequest = createAction('createBlogRequest');
const createBlogSuccess = createAction('createBlogSuccess');
const createBlogFail = createAction('createBlogFail');
const getAllBlogsRequest = createAction('getAllBlogsRequest');
const getAllBlogsSuccess = createAction('getAllBlogsSuccess');
const getAllBlogsFail = createAction('getAllBlogsFail');
const clearError = createAction('clearError');
const clearMessage = createAction('clearMessage');

export const blogReducer = createReducer({}, (builder) => {
    builder
        .addCase(createBlogRequest, (state) => {
            state.loading = true;
        }
        )
        .addCase(createBlogSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        .addCase(createBlogFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getAllBlogsRequest, (state) => {
            state.loading = true;
        })
        .addCase(getAllBlogsSuccess, (state, action) => {
            state.loading = false;
            state.blogs = action.payload.blogs;
        })
        .addCase(getAllBlogsFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(clearError, (state) => {
            state.error = null;
        })
        .addCase(clearMessage, (state) => {
            state.message = null;
        })
});