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
   <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
    <div className="w-2/3 px-2">
                <Input
                    label="Tittle :"
                    placeholder="Tittle"
                    className="mb-4"
                    {...register("tittle", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />

            </div>

            <div className="w-1/3 px-2">
    <label className="block mb-2 text-sm font-semibold text-gray-700">
        Featured Image
    </label>
    <Input
        label="Upload Image:"
        type="file"
        className="block w-full text-sm text-gray-700
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                transition duration-150 mb-4"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        {...register("image", { required: !post })}
    />
    {post && (
                    <div className="w-full mb-4">
                        <img
                            src={services.GetImage(post.featuredImage)}
                            alt={post.tittle}
                            className="rounded-lg"
                        />
                    </div>
                )}
    <Select
        options={["active", "inactive"]}
        label="Status"
        className="mb-4"
        {...register("status", { required: true })}
    />
    <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
        {post ? "Update" : "Submit"}
    </Button>
</div>


            {/* <div className="w-1/3 px-2">
                <Input
                    label="featuredImage:"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={services.GetImage(post.featuredImage)}
                            alt={post.tittle}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div> */}
   </form>
  )
}

export default PostForm