// import React, {useState, useEffect} from 'react'
// import { Container, PostCard } from '../index'
// import appwriteService from "../../appwrite/config";

// function AllPosts() {
//     const [posts, setPosts] = useState([])
//     useEffect(() => {}, [])
//     appwriteService.GetPost([]).then((posts) => {
//         if (posts) {
//             setPosts(posts.documents)
//         }
//     })
//   return (
//     <div className='w-full py-8'>
//         <Container>
//             <div className='flex flex-wrap'>
//                 {posts.map((post) => (
//                     <div key={post.$id} className='p-2 w-1/4'>
//                         <PostCard {...post} />
//                     </div>
//                 ))}
//             </div>
//             </Container>
//     </div>
//   )
// }

// export default AllPosts


import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../index'
import appwriteService from "../../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let mounted = true;
        
        const fetchPosts = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await appwriteService.GetAllPosts()
                
                if (mounted && response) {
                    setPosts(response.documents)
                }
            } catch (error) {
                if (mounted) {
                    console.error("Error fetching posts:", error)
                    setError("Failed to load posts. Please try again.")
                }
            } finally {
                if (mounted) {
                    setLoading(false)
                }
            }
        }
        
        fetchPosts()
        
        // Cleanup function to prevent state updates on unmounted component
        return () => { mounted = false }
    }, [])

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-80px)] py-8 sm:py-12 bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <Container>
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-lg text-gray-600">Loading posts...</p>
                    </div>
                </Container>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-[calc(100vh-80px)] py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <Container>
                    <div className="text-center max-w-md mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                            <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                                Oops! Something went wrong
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-4">
                                {error}
                            </p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="min-h-[calc(100vh-80px)] py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <Container>
                    <div className="text-center max-w-md mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                            <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                                No Posts Found
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-4">
                                There are no posts available at the moment.
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='min-h-[calc(100vh-80px)] py-6 sm:py-8 lg:py-12 bg-gradient-to-br from-blue-50 via-white to-blue-50'>
            <Container>
                {/* Header Section */}
                <div className="mb-8 sm:mb-12 text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        All Posts
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover all the amazing content from our community
                    </p>
                    <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
                        </span>
                    </div>
                </div>

                {/* Posts Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
                    {posts.map((post) => (
                        <div 
                            key={post.$id} 
                            className='w-full group'
                        >
                            <div className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <PostCard {...post} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More Section */}
                {posts.length > 12 && (
                    <div className="mt-12 text-center">
                        <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md">
                            Load More Posts
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </button>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllPosts
