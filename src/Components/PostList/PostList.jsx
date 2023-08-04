import { useSelector, useDispatch } from "react-redux"
import "./postListStyle.css"
import { useEffect, useState } from "react"
import { createPortal } from 'react-dom'
import {fetchPosts} from "../../Store/Slices/postListSlice"
import  AddPost  from './AddPost'

export default function PostList() {


        const dispatch = useDispatch()
        useEffect(()=>{
            dispatch(fetchPosts())
        },[dispatch])
        let postList = useSelector(store=>store.posts.posts)

        const posts =()=>{
            let posts = postList.map((post)=>
                <article className="post" key={post.id} >
                    <h1 className="header">{post.title}</h1>
                    <p className="post-text">{post.body}</p>
                </article>)
                return posts
                }
    

        const [form, setForm] = useState(false)

        const handleClickOpen=()=>{
            setForm(true)
         }

         const handleClickClose=()=>{
            setForm(false)
         }

    return(
        <>
        <ShowForm onClose = {handleClickClose} onAddPost={handleClickOpen}/>
        <div className={form ? 'post-list-dark':'post-list-light'}>
            {posts()}
        </div>
        </>
    )
    }



function ShowForm({onAddPost, onClose}){
    const [show,setShow] = useState(false)
    const handleClick=()=>{
        setShow(true)
        onAddPost()
    }

    return(
        <>
        <button className="add-button" onClick={handleClick}>Add post</button>
            {show && createPortal(<AddPost onClose={()=> {setShow(false) ; onClose()}}/>,document.body)}
        </>
    )
}


