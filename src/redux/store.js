
import { configureStore } from '@reduxjs/toolkit';
import  postsReducer   from './slices/post';
import  { authReducer }  from './slices/auth';


export default configureStore({
  reducer: {
    post: postsReducer,
    auth: authReducer,
  },
})