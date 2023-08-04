import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodo = createAsyncThunk(
    'todo/fetchTodo',
    async function(){
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        const data = await response.json()

        return data
    }
)

const todoSlice = createSlice(
    {
        name:"todoSlice",
        initialState:{
            todo:[],
        },
        reducers:{
            
            addTask (state, action){ 
                state.todo.push(action.payload)
            },

            deleteTask (state, action){
                let taskInd = state.todo.findIndex( task =>task.id === action.payload)
                state.todo.splice(taskInd,1)
            },

            toggleComplete(state,action){
                let taskIndex = state.todo.findIndex(task=> task.id === action.payload)
                let changeComplete = state.todo[taskIndex]
                changeComplete.completed = !changeComplete.completed
                state.todo.splice(taskIndex,1,changeComplete)
            },

            updateList(state,action){
                state.todo = action.payload
            }
        },
        extraReducers: (builder)=>{
            builder
            .addCase(fetchTodo.fulfilled, (state,action)=>{
                state.todo = action.payload
            })
        }
    }
)

export const { addTask, deleteTask,toggleComplete,updateList } = todoSlice.actions
export default todoSlice.reducer
