
import { useSelector,useDispatch } from "react-redux";
import './usersStyle.css'
import {fetchUsers} from '../../Store/Slices/userSlice'
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom"




export default function Users() {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchUsers())
    },[dispatch])

    const store = useSelector(state=> state.users.users)
   

    const users = store.map((user,index)=>
    <Link to = {`${user.username}`} style={{textDecoration:'none'}} className="user-link" key={index}>
    <div key={user.id} className="user">
        <h2 className="userName">{user.name}</h2>
        <p className="userDesc">{user.username}</p>
    </div>
    </Link>)
    
    return(
        <div className="userList">
            <div className="users">
            {users}
            </div>
            <div className="userPage">
                <Outlet />
            </div>
        </div>
    )
}