import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";


function PostCard({ ...post }) {
  const bgColors = ["bg-pink-50", "bg-blue-50", "bg-green-50", "bg-yellow-50"];
  const bgColor = bgColors[Math.floor(Math.random() * bgColors.length)];

    return (
    <Link to={`/post/${post.$id}`} className="block">
       <div className={`w-full ${bgColor} rounded-xl shadow-lg p-4 transition-all duration-300`}>
        <div className="w-full mb-4">
          <img
            src={appwriteService.GetImage(post.featuredImage)}
            alt={post.tittle}
            className="rounded-lg w-full h-40 object-cover"
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {post.tittle}
        </h2>
      </div>
    </Link>
  );



  // return (
  //   <Link to={`/post/${post.$id}`} className="block">
  //     <div className="w-full bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-4">
  //       <div className="w-full mb-4">
  //         <img
  //           src={appwriteService.GetImage(post.featuredImage)}
  //           alt={post.tittle}
  //           className="rounded-lg w-full h-40 object-cover"
  //         />
  //       </div>
  //       <h2 className="text-lg font-semibold text-gray-800 truncate">
  //         {post.tittle}
  //       </h2>
  //     </div>
  //   </Link>
  // );
}

export default PostCard;
