import { server } from '../store'
import axios from 'axios'

export const createBlog = (formData) => async (dispatch) => {
    try {
        dispatch({ type: 'createBlogRequest' });

        console.log("pinting form data");
        console.log({ formData });
        const { data } = await axios.post(`${server}/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });

        console.log({ data });
        dispatch({ type: 'createBlogSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'createBlogFail', payload: error.response.data.message });
    }
}

export const getAllBlogs = () => async (dispatch) => {
    try {
        dispatch({ type: 'getAllBlogsRequest' });

        const { data } = await axios.get(`${server}/blogs`, {
            withCredentials: true,
        });

        dispatch({ type: 'getAllBlogsSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'getAllBlogsFail', payload: error.response.data.message });
    }
}