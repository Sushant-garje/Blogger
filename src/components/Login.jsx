// import React,{useState} from 'react'
// import {useDispatch} from "react-redux"
// import {login as storeLogin} from "../store/AuthSlice"
// import authservice from "../appwrite/auth"
// import {Link,useNavigate} from "react-router-dom"
// import { useForm } from "react-hook-form"
// import {Button,Input,Logo} from "./index"

// function Login() {
//     const dispatch= useDispatch()
//     const navigate = useNavigate()
//     const [error,setError] = useState(null)
//     const {register,handleSubmit} = useForm()

//     const login = async(data)=>{
//         setError("")
//         try {
//              const session = await authservice.Login(data)
//             if(session){
//                 const userdata = await authservice.getCurrentUser()
//                 console.log(userdata)
//                 if(userdata){
//                     dispatch(storeLogin(userdata))
//                     navigate("/")
//                 }
//             }
//         } catch (error) {
//             setError(error.message)            
//         }
       
//     }


//   return (
//     <div className='flex items-center justify-center w-full'>
//         <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
//             <div className="mb-2 flex justify-center">
//                 <span className="inline-block w-full max-w-[100px]">
//                     <Logo width='100px'/>
//                 </span>
                
//             </div>
//             <h2 className="text-center text-2xl font-bold leading-tight">Sign in To Your Account</h2>
//             <p className="mt-2 text-center text-base text-black/60">
//                 Don&apos;t have any account?&nbsp;
//                     <Link
//                         to="/signup"
//                         className="font-medium text-primary transition-all duration-200 hover:underline"
//                     >
//                         Sign Up
//                     </Link>

//             </p>
//             {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
//             <form onSubmit={handleSubmit(login)} className='mt-4'>
//                 <div className='space-y-5'>
//                     <Input
//                         label = "Email: "
//                         placeholder = "enter your email"
//                         type = "email"
//                         {...register("email",{
//                             required : true,
//                             validate: {
//                                         matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                                         "Email address must be a valid address",
//                                       }
//                         })}
//                     />
//                     <Input
//                         label = "Password: "
//                         placeholder = "enter your Password"
//                         type = "password"
//                         {...register("password",{
//                             required : true,
                            
//                         })}
//                     />
//                     <Button type='submit' className="w-full">Sign in</Button>
//                 </div>
//             </form>
//         </div>
//     </div>
//   )
// }

// export default Login


import React,{useState} from 'react'
import {useDispatch} from "react-redux"
import {login as storeLogin} from "../store/AuthSlice"
import authservice from "../appwrite/auth"
import {Link,useNavigate} from "react-router-dom"
import { useForm } from "react-hook-form"
import {Button,Input,Logo} from "./index"

function Login() {
    const dispatch= useDispatch()
    const navigate = useNavigate()
    const [error,setError] = useState(null)
    const {register,handleSubmit} = useForm()

    const login = async(data)=>{
        setError("")
        try {
             const session = await authservice.Login(data)
            if(session){
                const userdata = await authservice.getCurrentUser()
                console.log(userdata)
                if(userdata){
                    dispatch(storeLogin(userdata))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)            
        }
       
    }

    return (
        <div className='flex items-center justify-center w-full min-h-[calc(100vh-80px)] px-4 py-6 sm:py-12 bg-gradient-to-br from-blue-50 via-white to-blue-50'>
            <div className={`mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-200/50`}>
                <div className="mb-4 sm:mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[80px] sm:max-w-[100px]">
                        <Logo width='80px' className="sm:w-[100px]"/>
                    </span>
                </div>
                
                <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-gray-800 mb-2">
                        Sign in To Your Account
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">
                        Welcome back! Please enter your details
                    </p>
                </div>

                <p className="text-center text-sm sm:text-base text-gray-600 mb-6">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-600 hover:text-blue-700 transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {error && (
                    <div className="mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm sm:text-base text-center font-medium">
                            {error}
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit(login)} className='space-y-5 sm:space-y-6'>
                    <div className='space-y-4 sm:space-y-5'>
                        <Input
                            label = "Email"
                            placeholder = "Enter your email address"
                            type = "email"
                            className="w-full"
                            {...register("email",{
                                required : "Email is required",
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label = "Password"
                            placeholder = "Enter your password"
                            type = "password"
                            className="w-full"
                            {...register("password",{
                                required : "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                        />
                    </div>
                    
                    <Button 
                        type='submit' 
                        className="w-full py-3 sm:py-3.5 text-sm sm:text-base font-semibold bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Sign in
                    </Button>
                </form>

                <div className="mt-6 sm:mt-8 text-center">
                    <p className="text-xs sm:text-sm text-gray-500">
                        By signing in, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
