import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Button, Container } from "../index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userID === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.GetPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.DeletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.DeleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
    <div className="min-h-[70vh] py-10 bg-blue-50">
        <Container>
            <div className="mx-auto max-w-3xl bg-white rounded-2xl shadow-xl border border-blue-100 p-6 relative">
                <div className="w-full flex justify-center mb-6">
                    <img
                        src={appwriteService.GetImage(post.featuredImage)}
                        alt={post.tittle}
                        className="rounded-2xl max-h-96 object-cover w-full shadow-md"
                    />
                    {isAuthor && (
                        <div className="absolute right-8 top-8 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-2">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{post.tittle}</h1>
                </div>
                <div className="prose max-w-none text-gray-700">
                    {parse(post.content)}
                </div>
            </div>
        </Container>
    </div>
) : null;


//     return post ? (
//         <div className="py-8">
//             <Container>
//                 <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
//                     <img
//                         src={appwriteService.GetImage(post.featuredImage)}
//                         alt={post.tittle}
//                         className="rounded-xl"
//                     />

//                     {isAuthor && (
//                         <div className="absolute right-6 top-6">
//                             <Link to={`/edit-post/${post.$id}`}>
//                                 <Button bgColor="bg-green-500" className="mr-3">
//                                     Edit
//                                 </Button>
//                             </Link>
//                             <Button bgColor="bg-red-500" onClick={deletePost}>
//                                 Delete
//                             </Button>
//                         </div>
//                     )}
//                 </div>
//                 <div className="w-full mb-6">
//                     <h1 className="text-2xl font-bold">{post.tittle}</h1>
//                 </div>
//                 <div className="browser-css">
//                     {parse(post.content)}
//                     </div>
//             </Container>
//         </div>
//     ) : null;
}