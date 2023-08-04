import {configureStore} from "@reduxjs/toolkit"
import postListSlice from "./Slices/postListSlice"
import todoSlice from "./Slices/todoSlice"
import userSlice from "./Slices/userSlice"

export default configureStore({
    reducer:{
        todo: todoSlice,
        posts: postListSlice,
        users: userSlice,
    }
})