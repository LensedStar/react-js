import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts' ,
    async function() {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
            const data = await response.json()
            return await data
    }
)

export const putPosts = createAsyncThunk(
    'posts/putPosts',
    async function (post, { dispatch }) {
        const response =  await fetch('https://jsonplaceholder.typicode.com/posts',{
            method:'POST',
            body:JSON.stringify({
                title: post.title,
                body: post.body,
                userId:1,
            }),
            headers:{
                'Content-type': 'application/json; charset=UTF-8'
            }
        })

        dispatch(loading())

        if(response.ok){
            console.log('wORKS!')
            dispatch(addPost(post))
        }
    }
)

const postListSlice = createSlice(
    {
        name:"postSlice",
        initialState:{
            posts:[]
        },
        reducers:{
            addPost(state,action){
                console.log('Adding')
                const {title,body} = action.payload
                state.posts.push(
                    {
                        id:state.posts[state.posts.length - 1].id + 1,
                        title:title,
                        body:body
                    }
                )
            },
            loading(){
                return
            }
        },
        extraReducers: (builder) =>{
            builder
            .addCase(fetchPosts.fulfilled, (state, action)=>{
                state.posts = action.payload
            })
        }})


export const { addPost,loading } = postListSlice.actions
export default postListSlice.reducer