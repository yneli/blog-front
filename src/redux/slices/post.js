import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => {
    try {
        const { data } = await axios.get(`/posts/get`);
        
    return data 
    
    } catch (error) {
        console.log(error);
    }

});

export const delPosts = createAsyncThunk('posts/delPosts', async(id) => {
   const { data } = await axios.delete(`http://localhost:4000/posts/${id}`)
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async() => {
    const { data } = await axios.get('http://localhost:4000/posts/tags');
    return data
})

const initialState = {
    post: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },

};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.post.items = [];
            state.post.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.post.items = action.payload;
            state.post.status = 'loaded';
            console.log('all ok')

        },
        [fetchPosts.rejected]: (state, action) => {
            state.post.items = [];
            state.post.status = 'error';
            console.log('all not ok');

        },
        [fetchTags.pending]: (state, action) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
            console.log('all ok')

        },
        [fetchTags.rejected]: (state, action) => {
            state.tags.items = [];
            state.tags.status = 'error';
            console.log('all not ok');

        },
        [delPosts.pending]: (state, action) => {
            state.post.items = state.post.items.filter((obj) => obj._id !== action.meta.arg)
        },
       

}});


export default postsSlice.reducer