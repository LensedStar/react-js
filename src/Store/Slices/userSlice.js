
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async function(){
        let response = await fetch('https://jsonplaceholder.typicode.com/users')
        let data = await response.json()

        return data
    }
) 

const userSlice = createSlice(
    {
        name:"userSlice",
        initialState:{
            users:[]
        },
        extraReducers: (builder)=>{
            builder
            .addCase(fetchUsers.fulfilled, (state,actions)=>{
                state.users = actions.payload
            })
        }
    }
)

export default userSlice.reducer