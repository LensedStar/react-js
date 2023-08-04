import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Todo from './Components/Todo/Todo';
import { Provider } from 'react-redux';
import PostList from "./Components/PostList/PostList"
import store from './Store/store';
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Nav from './Components/Navigation/Navigation';
import Users from './Components/Users/Users';
import UserPage from './Components/Users/UserPage';


const router = createBrowserRouter([
  {
    path: '/',
    element:<Nav />,
    children:[
      {
        path:'/',
        element: <Todo />,
    
      },
      {
        path:'/post',
        element: <PostList />,
      },
      {
        path:"/users",
        element: <Users />,
        children:[
          {
          path:':userName',
          element: <UserPage />

          }
        ]
      }
    ],
  }
])

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
