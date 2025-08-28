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
      <div className="w-full py-20 mt-6 text-center bg-gray-50">
        <Container>
          <Link to ="/login">
            <div className="flex flex-wrap justify-center">
              <div className="p-4 w-full">
                <h1 className="text-3xl font-bold text-gray-700 hover:text-gray-900 transition-colors duration-300">
                  Login to read posts
                </h1>
              </div>
            </div>
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-HeaderHeight-FooterHeight)] bg-blue-50 py-10">
      <Container>
        <div className="flex flex-wrap gap-6">
          {posts.map((post) => (
            <div key={post.$id} className="w-full sm:w-1/2 lg:w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );

  //   return (
  //     <div className="w-full py-10 bg-gray-50">
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
}

export default Home;
