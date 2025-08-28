import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/AuthSlice'
import authservice from '../../appwrite/auth'


function Logoutbtn() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authservice.Logout("")
        .then(()=>{
             dispatch(logout())
        })
        
    }
  return (
    <button onClick={logoutHandler} className='inline-block px-6 py-2 duration-200 rounded-full hover:bg-red-500'
    >LogOut</button>
  )
}

export default Logoutbtn