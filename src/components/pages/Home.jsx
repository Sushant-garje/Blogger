// import React, { useEffect, useState } from "react";
// import services from "../../appwrite/config";
// import { Container, PostCard } from "../../components/index";
// import { Link } from "react-router-dom";

// function Home() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     services.GetAllPosts().then((posts) => {
//       if (posts) setPosts(posts.documents);
//     });
//   }, []);

//   if (posts.length === 0) {
//     return (
//       <div className="w-full py-20 mt-6 text-center bg-gray-50">
//         <Container>
//           <Link to ="/login">
//             <div className="flex flex-wrap justify-center">
//               <div className="p-4 w-full">
//                 <h1 className="text-3xl font-bold text-gray-700 hover:text-gray-900 transition-colors duration-300">
//                   Login to read posts
//                 </h1>
//               </div>
//             </div>
//           </Link>
//         </Container>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-[calc(100vh-HeaderHeight-FooterHeight)] bg-blue-50 py-10">
//       <Container>
//         <div className="flex flex-wrap gap-6">
//           {posts.map((post) => (
//             <div key={post.$id} className="w-full sm:w-1/2 lg:w-1/4">
//               <PostCard {...post} />
//             </div>
//           ))}
//         </div>
//       </Container>
//     </div>
//   );

//   //   return (
//   //     <div className="w-full py-10 bg-gray-50">
//   //       <Container>
//   //         <div className="flex flex-wrap gap-6">
//   //           {posts.map((post) => (
//   //             <div key={post.$id} className="w-full sm:w-1/2 lg:w-1/4">
//   //               <PostCard {...post} />
//   //             </div>
//   //           ))}
//   //         </div>
//   //       </Container>
//   //     </div>
//   //   );
// }

// export default Home;


import React, { useEffect, useState } from "react";
import services from "../../appwrite/config";
import { Container, PostCard } from "../../components/index";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    services.GetAllPosts().then((posts) => {
      if (posts) setPosts(posts.documents);
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-12 sm:py-16 lg:py-20 mt-4 sm:mt-6 text-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Container>
          <Link to="/login">
            <div className="flex flex-wrap justify-center">
              <div className="p-4 sm:p-6 w-full max-w-md sm:max-w-lg">
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="mb-4">
                    <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 leading-tight">
                    Welcome to Our Blog
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    Please login to access and read all posts
                  </p>
                  <div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors duration-300">
                    Login Now
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-blue-50 via-white to-blue-50 py-6 sm:py-8 lg:py-10">
      <Container>
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-2">
            Latest Posts
          </h2>
          <p className="text-sm sm:text-base text-gray-600 text-center max-w-2xl mx-auto">
            Discover amazing content from our community
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {posts.map((post) => (
            <div 
              key={post.$id} 
              className="w-full group"
            >
              <div className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <PostCard {...post} />
              </div>
            </div>
          ))}
        </div>
        
        {posts.length > 0 && (
          <div className="text-center mt-8 sm:mt-12">
            <p className="text-sm sm:text-base text-gray-600">
              Showing {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
