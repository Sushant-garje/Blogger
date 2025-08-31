// import React, { use, useEffect } from 'react'
// import { useForm } from 'react-hook-form'
// import {Button,Input,RTE,Select} from "../index"
// import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import services from '../../appwrite/config'
// import { useSelector } from 'react-redux'
// import { useCallback } from 'react'

// function PostForm({post}) {
//   const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//         defaultValues: {
//             tittle: post?.tittle || "",
//             slug: post?.$id || "",
//             content: post?.content || "",
//             status: post?.status || "active",
//         },
//     });

//     const navigate = useNavigate();
//     const userData = useSelector((state)=>state.auth.userData)
//     console.log(userData.$id)

//     const submit = async(data)=>{
//       if(post){ //update post
//         const file = data.image[0]?await services.UploadFile(data.image[0]) : null;

//         if(file){
//           services.DeleteFile(post.FeaturedImage)
//         }

//         const dbpost = services.UpdatePost(post.$id,{...post,
//           featuredImage: file ? file.$id : post.featuredImage,
//         })

//         if (dbpost){
//           navigate(`/post/${dbpost.$id}`)
//         }

//       }
//       else{
//         const file = await services.UploadFile(data.image[0]);
//         if (file){
//           data.featuredImage = file.$id;
//           console.log({...data,userID: userData.$id})
//           const dbpost = await services.CreatePost({...data,userID: userData.$id})
          
//           if(dbpost){
//             navigate(`/post/${dbpost.$id}`)
//           }

//         }
        
//       }
//     };

//      const slugTransform = useCallback((value) => {
//         if (value && typeof value === "string")
//             return value
//                 .trim()
//                 .toLowerCase()
//                 .replace(/[^a-zA-Z\d\s]+/g, "-")
//                 .replace(/\s/g, "-");

//         return "";
//     }, []);

//     useEffect(()=>{
//       const subscription = watch((value,{name})=>{
//         if(name === "tittle"){
//           setValue("slug",slugTransform(value.tittle),{shouldValidate:true})
//         }

//         return () => subscription.unsubscribe();
//       })  
//     },[watch,setValue,slugTransform])

//   return (
//    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
//     <div className="w-2/3 px-2">
//                 <Input
//                     label="Tittle :"
//                     placeholder="Tittle"
//                     className="mb-4"
//                     {...register("tittle", { required: true })}
//                 />
//                 <Input
//                     label="Slug :"
//                     placeholder="Slug"
//                     className="mb-4"
//                     {...register("slug", { required: true })}
//                     onInput={(e) => {
//                         setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
//                     }}
//                 />
//                 <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />

//             </div>

//             <div className="w-1/3 px-2">
//     <label className="block mb-2 text-sm font-semibold text-gray-700">
//         Featured Image
//     </label>
//     <Input
//         label="Upload Image:"
//         type="file"
//         className="block w-full text-sm text-gray-700
//                 file:mr-4 file:py-2 file:px-4
//                 file:rounded-full file:border-0
//                 file:bg-blue-50 file:text-blue-700
//                 hover:file:bg-blue-100
//                 transition duration-150 mb-4"
//         accept="image/png, image/jpg, image/jpeg, image/gif"
//         {...register("image", { required: !post })}
//     />
//     {post && (
//                     <div className="w-full mb-4">
//                         <img
//                             src={services.GetImage(post.featuredImage)}
//                             alt={post.tittle}
//                             className="rounded-lg"
//                         />
//                     </div>
//                 )}
//     <Select
//         options={["active", "inactive"]}
//         label="Status"
//         className="mb-4"
//         {...register("status", { required: true })}
//     />
//     <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
//         {post ? "Update" : "Submit"}
//     </Button>
// </div>


//             {/* <div className="w-1/3 px-2">
//                 <Input
//                     label="featuredImage:"
//                     type="file"
//                     className="mb-4"
//                     accept="image/png, image/jpg, image/jpeg, image/gif"
//                     {...register("image", { required: !post })}
//                 />
//                 {post && (
//                     <div className="w-full mb-4">
//                         <img
//                             src={services.GetImage(post.featuredImage)}
//                             alt={post.tittle}
//                             className="rounded-lg"
//                         />
//                     </div>
//                 )}
//                 <Select
//                     options={["active", "inactive"]}
//                     label="Status"
//                     className="mb-4"
//                     {...register("status", { required: true })}
//                 />
//                 <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
//                     {post ? "Update" : "Submit"}
//                 </Button>
//             </div> */}
//    </form>
//   )
// }

// export default PostForm


import React, { use, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {Button,Input,RTE,Select} from "../index"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import services from '../../appwrite/config'
import { useSelector } from 'react-redux'
import { useCallback } from 'react'

function PostForm({post}) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            tittle: post?.tittle || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state)=>state.auth.userData)
    console.log(userData.$id)

    const submit = async(data)=>{
        if(post){ //update post
            const file = data.image[0]?await services.UploadFile(data.image[0]) : null;

            if(file){
                services.DeleteFile(post.FeaturedImage)
            }

            const dbpost = services.UpdatePost(post.$id,{...post,
                featuredImage: file ? file.$id : post.featuredImage,
            })

            if (dbpost){
                navigate(`/post/${dbpost.$id}`)
            }
        }
        else{
            const file = await services.UploadFile(data.image[0]);
            if (file){
                data.featuredImage = file.$id;
                console.log({...data,userID: userData.$id})
                const dbpost = await services.CreatePost({...data,userID: userData.$id})
                
                if(dbpost){
                    navigate(`/post/${dbpost.$id}`)
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if(name === "tittle"){
                setValue("slug",slugTransform(value.tittle),{shouldValidate:true})
            }

            return () => subscription.unsubscribe();
        })  
    },[watch,setValue,slugTransform])

    return (
        <div className="min-h-[calc(100vh-80px)] py-6 sm:py-8 lg:py-10 bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                        {post ? "Edit Post" : "Create New Post"}
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">
                        {post ? "Update your post content and settings" : "Share your thoughts with the community"}
                    </p>
                </div>

                <form onSubmit={handleSubmit(submit)} className='space-y-6 lg:space-y-0 lg:flex lg:gap-8'>
                    {/* Main Content Section */}
                    <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-4 sm:p-6 lg:p-8">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                                Post Content
                            </h2>
                            
                            <div className="space-y-4 sm:space-y-6">
                                <Input
                                    label="Title"
                                    placeholder="Enter post title"
                                    className="w-full"
                                    {...register("tittle", { 
                                        required: "Title is required",
                                        minLength: {
                                            value: 3,
                                            message: "Title must be at least 3 characters"
                                        }
                                    })}
                                />
                                <Input
                                    label="Slug"
                                    placeholder="post-url-slug"
                                    className="w-full"
                                    {...register("slug", { 
                                        required: "Slug is required",
                                        pattern: {
                                            value: /^[a-z0-9-]+$/,
                                            message: "Slug can only contain lowercase letters, numbers, and hyphens"
                                        }
                                    })}
                                    onInput={(e) => {
                                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                                    }}
                                />
                                <div className="min-h-[300px] sm:min-h-[400px]">
                                    <RTE 
                                        label="Content" 
                                        name="content" 
                                        control={control} 
                                        defaultValue={getValues("content")} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Section */}
                    <div className="w-full lg:w-1/3 space-y-4 sm:space-y-6">
                        {/* Featured Image Card */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-4 sm:p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Featured Image
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="relative">
                                    <Input
                                        label="Upload Image"
                                        type="file"
                                        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer"
                                        accept="image/png, image/jpg, image/jpeg, image/gif"
                                        {...register("image", { 
                                            required: !post ? "Featured image is required" : false 
                                        })}
                                    />
                                </div>
                                
                                {post && post.featuredImage && (
                                    <div className="relative">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Current Image:</p>
                                        <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                                            <img
                                                src={services.GetImage(post.featuredImage)}
                                                alt={post.tittle}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Post Settings Card */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-4 sm:p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Post Settings
                            </h3>
                            
                            <div className="space-y-4">
                                <Select
                                    options={["active", "inactive"]}
                                    label="Status"
                                    className="w-full"
                                    {...register("status", { required: "Status is required" })}
                                />
                                
                                <div className="pt-2">
                                    <Button 
                                        type="submit" 
                                        bgColor={post ? "bg-emerald-600" : "bg-blue-600"} 
                                        className={`w-full py-3 sm:py-4 text-sm sm:text-base font-semibold text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${post ? 'hover:bg-emerald-700 active:bg-emerald-800' : 'hover:bg-blue-700 active:bg-blue-800'} shadow-md`}
                                    >
                                        {post ? "Update Post" : "Publish Post"}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Help Card */}
                        <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 sm:p-6">
                            <h4 className="text-sm font-semibold text-blue-900 mb-2">
                                💡 Tips
                            </h4>
                            <ul className="text-xs sm:text-sm text-blue-800 space-y-1">
                                <li>• Use a clear, descriptive title</li>
                                <li>• Add high-quality featured image</li>
                                <li>• Write engaging content</li>
                                <li>• Set status to "active" to publish</li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostForm
