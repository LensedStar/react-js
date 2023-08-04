import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPassport, faUser, faEnvelope, faCity } from '@fortawesome/free-solid-svg-icons'
import './userPageStyle.css'
import { createPortal } from "react-dom";


export default function UserPage() {
    const store = useSelector(state => state.users.users)

    const { userName } = useParams()

    const user = store.find(user => user.username === userName)

   const userId = user && user.id


    
    return(
        <>
        { user ?
        <>
        <span className="user-name">
            <FontAwesomeIcon icon={ faPassport }/>
            <p> Name: { user.name }</p>
        </span>
        <span className="user-username">
            <FontAwesomeIcon icon={ faUser }/>
            <p>Username : { user.username}</p>
        </span>
        <span className="user-email">
            <FontAwesomeIcon icon={ faEnvelope } />
            <p>Email: { user.email }</p>
        </span>
        <span className="user-city">
            <FontAwesomeIcon icon={ faCity } />
            <p>City : {user.address.city}</p>
        </span>

        <Tabs userId={userId}/> 
        </>
        :
          createPortal(<div className="userPage-loading-circle"> </div>, document.body)
        }
        </>
    )}


function Tabs({userId}) {

    const [tab,setTab] = useState(1)

    return(
        <div className="tabs">
            <ul className="tab-buttons">
                <li className = {tab === 1 ? "tab-clicked": ''} onClick={()=>setTab(1)} >Todo</li>
                <li className = {tab === 2 ? "tab-clicked": ''} onClick={()=>setTab(2)} >Posts</li>
                <li className = {tab === 3 ? "tab-clicked": ''} onClick={()=>setTab(3)} >Albums</li>
            </ul>
            <div className="tab-info"> 
                {tab === 1 && <UserTodos userId={userId}/>}
                {tab === 2 && <UserPosts userId={userId}/>}
                {tab === 3 && <UserAlbum userId={userId}/>}
            </div>
        </div>
    )
}

function UserTodos({userId}) {
    const [ loader,setLoader] = useState(true)

    const [ todos, setTodos ] = useState(null)

    const fetchTodos = () =>{
        setLoader(true)
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
        .then((response)=>response.json())
        .then((response)=> { 
        setTodos(response)
        setLoader(false) 
        })
    }

    useEffect(()=>{
        fetchTodos()
    },[userId])

    return(
        <>
        {
            loader ?
            <div className="loading-circle"></div>
            :
            todos && todos.map((todo,index)=>
                <div className={todos.completed ? 'todos-complete' : 'todos'} key={index}>
                    <input type="checkbox" checked = {todo.completed}></input>
                    <p>{todo.title}</p>
                </div>
            )}
        </>
    )
}


function UserPosts({userId}) {

    const [ loader,setLoader] = useState(true)

    const [ posts, setPost ] = useState(null)

    const fetchTodos = () =>{
        setLoader(true)
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then((response)=>response.json())
        .then((response)=> { 
        setPost(response)
        setLoader(false) 
        })
    }

    useEffect(()=>{
        fetchTodos()
    },[userId])

    return(
        <>
        {
            loader ?
            <div className="loading-circle"></div>
            :
            posts && posts.map((post,index)=>
                <div className="posts" key={index}>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                </div>
            )}
        </>
    )
}


function UserAlbum({userId}) {

    const [ loader,setLoader] = useState(true)

    const [ album, setAlbum ] = useState(null)

    const fetchTodos = () =>{
        setLoader(true)
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
        .then((response)=>response.json())
        .then((response)=> { 
        setAlbum(response)
        setLoader(false) 
        })
    }

    useEffect(()=>{
        fetchTodos()
    },[userId])

    return(
        <>
        {
            loader ?
            <div className="loading-circle"></div>
            :
            album && album.map((album,index)=>
                <div className="albums" key={index}>
                    <h3>{album.title}</h3>
                </div>
            )}
        </>
    )
}