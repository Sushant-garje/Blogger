// import React,{use, useState} from 'react'
// import { Link,useNavigate } from 'react-router-dom'
// import {useForm} from "react-hook-form"
// import authservice from '../appwrite/auth'
// import { useDispatch } from 'react-redux'
// import { login as storeLogin } from '../store/AuthSlice'
// import {Button,Input,Logo} from "./index"

// function Signup() {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const [error,setError] = useState(null)
//     const {register,handleSubmit} = useForm()

//     const signup = async(data)=>{
//             setError("")
//             try {
//                 const userdata = await authservice.createUser(data)
//                 if(userdata){
//                     const user = await authservice.getCurrentUser()
//                     dispatch(storeLogin(userdata));
//                     navigate("/");
//                 }
                
//             } catch (error) {
//                 setError(error.message)
//             }
//         }

//   return (
//     <div className="flex items-center justify-center">
//         <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
//             <div className="mb-2 flex justify-center">
//                 <span className="inline-block w-full max-w-[100px]">
//                     <Logo width='100px'/>
//                 </span>
//             </div>
//             <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
//             <p className="mt-2 text-center text-base text-black/60">
//                     Already have an account?&nbsp;
//                     <Link
//                         to="/login"
//                         className="font-medium text-primary transition-all duration-200 hover:underline"
//                     >
//                         Sign In
//                     </Link>
//                 </p>
//             {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

//             <form onSubmit={handleSubmit(signup)}>
//                 <div className='space-y-5'>
//                     <Input 
//                     label = "Full Name: "
//                     type="text" 
//                     placeholder='Enter Your Full Name'
//                     {...register("name",{
//                         required : true,
//                     })}
//                     />
//                     <Input
//                         label="Email: "
//                         placeholder="Enter your email"
//                         type="email"
//                         {...register("email", {
//                             required: true,
//                             validate: {
//                                 matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                                 "Email address must be a valid address",
//                             }
//                         })}
//                         />
//                         <Input
//                         label="Password: "
//                         type="password"
//                         placeholder="Enter your password"
//                         {...register("password", {
//                             required: true,})}
//                         />
//                         <Button type="submit" className="w-full">
//                             Create Account
//                         </Button>
//                 </div>
//             </form>
//         </div>
//     </div>
//   )
// }

// export default Signup


import React, {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {useForm} from "react-hook-form"
import authservice from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login as storeLogin } from '../store/AuthSlice'
import {Button,Input,Logo} from "./index"

function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error,setError] = useState(null)
    const {register,handleSubmit} = useForm()

    const signup = async(data)=>{
            setError("")
            try {
                const userdata = await authservice.createUser(data)
                if(userdata){
                    const user = await authservice.getCurrentUser()
                    dispatch(storeLogin(userdata));
                    navigate("/");
                }
                
            } catch (error) {
                setError(error.message)
            }
        }

    return (
        <div className="flex items-center justify-center w-full min-h-[calc(100vh-80px)] px-4 py-6 sm:py-12 bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className={`mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-200/50`}>
                <div className="mb-4 sm:mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[80px] sm:max-w-[100px]">
                        <Logo width='80px' className="sm:w-[100px]"/>
                    </span>
                </div>
                
                <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-gray-800 mb-2">
                        Create Your Account
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">
                        Join our community today
                    </p>
                </div>

                <p className="text-center text-sm sm:text-base text-gray-600 mb-6">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-600 hover:text-blue-700 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {error && (
                    <div className="mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm sm:text-base text-center font-medium">
                            {error}
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit(signup)} className='space-y-5 sm:space-y-6'>
                    <div className='space-y-4 sm:space-y-5'>
                        <Input 
                            label="Full Name"
                            type="text" 
                            placeholder='Enter your full name'
                            className="w-full"
                            {...register("name",{
                                required: "Full name is required",
                                minLength: {
                                    value: 2,
                                    message: "Name must be at least 2 characters"
                                }
                            })}
                        />
                        <Input
                            label="Email"
                            placeholder="Enter your email address"
                            type="email"
                            className="w-full"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Create a strong password"
                            className="w-full"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                }
                            })}
                        />
                    </div>
                    
                    <Button 
                        type="submit" 
                        className="w-full py-3 sm:py-3.5 text-sm sm:text-base font-semibold bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Create Account
                    </Button>
                </form>

                <div className="mt-6 sm:mt-8 text-center">
                    <p className="text-xs sm:text-sm text-gray-500">
                        By creating an account, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup
