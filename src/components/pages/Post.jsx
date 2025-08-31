// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import appwriteService from "../../appwrite/config";
// import { Button, Container } from "../index";
// import parse from "html-react-parser";
// import { useSelector } from "react-redux";

// export default function Post() {
//     const [post, setPost] = useState(null);
//     const { slug } = useParams();
//     const navigate = useNavigate();

//     const userData = useSelector((state) => state.auth.userData);

//     const isAuthor = post && userData ? post.userID === userData.$id : false;

//     useEffect(() => {
//         if (slug) {
//             appwriteService.GetPost(slug).then((post) => {
//                 if (post) setPost(post);
//                 else navigate("/");
//             });
//         } else navigate("/");
//     }, [slug, navigate]);

//     const deletePost = () => {
//         appwriteService.DeletePost(post.$id).then((status) => {
//             if (status) {
//                 appwriteService.DeleteFile(post.featuredImage);
//                 navigate("/");
//             }
//         });
//     };

//     return post ? (
//     <div className="min-h-[70vh] py-10 bg-blue-50">
//         <Container>
//             <div className="mx-auto max-w-3xl bg-white rounded-2xl shadow-xl border border-blue-100 p-6 relative">
//                 <div className="w-full flex justify-center mb-6">
//                     <img
//                         src={appwriteService.GetImage(post.featuredImage)}
//                         alt={post.tittle}
//                         className="rounded-2xl max-h-96 object-cover w-full shadow-md"
//                     />
//                     {isAuthor && (
//                         <div className="absolute right-8 top-8 flex gap-2">
//                             <Link to={`/edit-post/${post.$id}`}>
//                                 <Button bgColor="bg-green-500" className="mr-2">
//                                     Edit
//                                 </Button>
//                             </Link>
//                             <Button bgColor="bg-red-500" onClick={deletePost}>
//                                 Delete
//                             </Button>
//                         </div>
//                     )}
//                 </div>
//                 <div className="mb-6">
//                     <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{post.tittle}</h1>
//                 </div>
//                 <div className="prose max-w-none text-gray-700">
//                     {parse(post.content)}
//                 </div>
//             </div>
//         </Container>
//     </div>
// ) : null;


// //     return post ? (
// //         <div className="py-8">
// //             <Container>
// //                 <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
// //                     <img
// //                         src={appwriteService.GetImage(post.featuredImage)}
// //                         alt={post.tittle}
// //                         className="rounded-xl"
// //                     />

// //                     {isAuthor && (
// //                         <div className="absolute right-6 top-6">
// //                             <Link to={`/edit-post/${post.$id}`}>
// //                                 <Button bgColor="bg-green-500" className="mr-3">
// //                                     Edit
// //                                 </Button>
// //                             </Link>
// //                             <Button bgColor="bg-red-500" onClick={deletePost}>
// //                                 Delete
// //                             </Button>
// //                         </div>
// //                     )}
// //                 </div>
// //                 <div className="w-full mb-6">
// //                     <h1 className="text-2xl font-bold">{post.tittle}</h1>
// //                 </div>
// //                 <div className="browser-css">
// //                     {parse(post.content)}
// //                     </div>
// //             </Container>
// //         </div>
// //     ) : null;
// }


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
        if (window.confirm("Are you sure you want to delete this post?")) {
            appwriteService.DeletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.DeleteFile(post.featuredImage);
                    navigate("/");
                }
            });
        }
    };

    return post ? (
        <div className="min-h-[calc(100vh-80px)] py-6 sm:py-8 lg:py-10 bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <Container>
                <div className="mx-auto max-w-xs sm:max-w-2xl lg:max-w-4xl">
                    {/* Back Navigation */}
                    <div className="mb-4 sm:mb-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                        </button>
                    </div>

                    {/* Main Post Card */}
                    <article className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden relative">
                        {/* Featured Image Container */}
                        <div className="relative">
                            <div className="w-full flex justify-center">
                                <img
                                    src={appwriteService.GetImage(post.featuredImage)}
                                    alt={post.tittle}
                                    className="rounded-t-xl sm:rounded-t-2xl max-h-64 sm:max-h-80 lg:max-h-96 object-cover w-full shadow-sm"
                                />
                            </div>
                            
                            {/* Author Actions */}
                            {isAuthor && (
                                <>
                                    {/* Desktop Actions */}
                                    <div className="hidden sm:flex absolute top-4 right-4 gap-2">
                                        <Link to={`/edit-post/${post.$id}`}>
                                            <Button 
                                                bgColor="bg-emerald-600" 
                                                className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 shadow-md"
                                            >
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button 
                                            bgColor="bg-red-600" 
                                            onClick={deletePost}
                                            className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-md"
                                        >
                                            Delete
                                        </Button>
                                    </div>

                                    {/* Mobile Actions - Icon Only */}
                                    <div className="sm:hidden absolute top-3 right-3 flex gap-1">
                                        <Link to={`/edit-post/${post.$id}`}>
                                            <Button 
                                                bgColor="bg-emerald-600" 
                                                className="p-2 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 shadow-md"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </Button>
                                        </Link>
                                        <Button 
                                            bgColor="bg-red-600" 
                                            onClick={deletePost}
                                            className="p-2 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-md"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Content Section */}
                        <div className="p-4 sm:p-6 lg:p-8">
                            {/* Title Section */}
                            <div className="mb-4 sm:mb-6">
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
                                    {post.tittle}
                                </h1>
                                
                                {/* Mobile Author Actions - Full Width Buttons */}
                                {isAuthor && (
                                    <div className="sm:hidden mb-4 flex gap-2">
                                        <Link to={`/edit-post/${post.$id}`} className="flex-1">
                                            <Button 
                                                bgColor="bg-emerald-600" 
                                                className="w-full py-3 text-sm font-medium text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                                            >
                                                Edit Post
                                            </Button>
                                        </Link>
                                        <Button 
                                            bgColor="bg-red-600" 
                                            onClick={deletePost}
                                            className="flex-1 py-3 text-sm font-medium text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                                        >
                                            Delete Post
                                        </Button>
                                    </div>
                                )}
                            </div>
                            
                            {/* Content */}
                            <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700">
                                <div className="[&>*]:mb-3 [&>*:last-child]:mb-0 [&>p]:text-sm [&>p]:sm:text-base [&>p]:leading-relaxed [&>h1]:text-lg [&>h1]:sm:text-xl [&>h1]:font-bold [&>h2]:text-base [&>h2]:sm:text-lg [&>h2]:font-semibold [&>h3]:text-sm [&>h3]:sm:text-base [&>h3]:font-medium [&>img]:rounded-lg [&>img]:shadow-sm [&>img]:my-4 [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>li]:mb-1">
                                    {parse(post.content)}
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Bottom Navigation */}
                    <div className="mt-6 sm:mt-8 text-center">
                        <Link
                            to="/"
                            className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                            </svg>
                            All Posts
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
