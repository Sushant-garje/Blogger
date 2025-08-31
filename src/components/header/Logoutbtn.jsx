// import React from 'react'
// import { useDispatch } from 'react-redux'
// import { logout } from '../../store/AuthSlice'
// import authservice from '../../appwrite/auth'


// function Logoutbtn() {
//     const dispatch = useDispatch()

//     const logoutHandler = () => {
//         authservice.Logout("")
//         .then(()=>{
//              dispatch(logout())
//         })
        
//     }
//   return (
//     <button onClick={logoutHandler} className='inline-block px-6 py-2 duration-200 rounded-full hover:bg-red-500'
//     >LogOut</button>
//   )
// }

// export default Logoutbtn


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
    <button 
        onClick={logoutHandler} 
        className='inline-block px-3 sm:px-4 lg:px-6 py-2 text-xs sm:text-sm font-medium duration-200 rounded-full bg-white text-gray-800 hover:bg-red-500 active:bg-red-700 transition-all shadow-sm min-w-[80px] sm:min-w-[90px] whitespace-nowrap'
    >
        LogOut
    </button>
  )
}

export default Logoutbtn
