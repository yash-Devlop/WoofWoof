// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import Spinner from "@/app/components/loader/Spinner";

// export default function BlogDetail() {
//   const { slug } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!slug) return;

//     const fetchBlog = async () => {
//       try {
//         const res = await axios.get(`/api/admin/blogs/${slug}`);
//         setBlog(res.data.data);
//       } catch (err) {
//         console.error("Error fetching blog:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlog();
//   }, [slug]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-white">
//         <Spinner />
//       </div>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             Blog not found
//           </h2>
//           <p className="text-gray-500">
//             The blog post you're looking for doesn't exist.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const createdDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

//   const updatedDate = new Date(blog.updatedAt).toLocaleDateString("en-US", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section with Cover Image */}
//       <div className="relative w-full h-[300px] md:h-[500px] bg-gray-100">
//         <Image
//           src={blog.innerImage}
//           alt={blog.title}
//           fill
//           priority
//           className="object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
//         {/* Title Overlay */}
//         <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
//           <div className="max-w-5xl mx-auto">
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg"
//             >
//               {blog.title}
//             </motion.h1>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="flex flex-wrap items-center gap-3 md:gap-4 text-white/90 text-sm md:text-base"
//             >
//               <span className="flex items-center gap-2">
//                 <svg
//                   className="w-4 h-4 md:w-5 md:h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>
//                 {createdDate}
//               </span>
//               {createdDate !== updatedDate && (
//                 <span className="flex items-center gap-2">
//                   <svg
//                     className="w-4 h-4 md:w-5 md:h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                     />
//                   </svg>
//                   Updated {updatedDate}
//                 </span>
//               )}
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
//         {/* Excerpt */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="mb-12 md:mb-16"
//         >
//           <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed">
//             {blog.excerpt}
//           </p>
//         </motion.div>

//         {/* Main Content */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//         >
//           <article
//             className="prose prose-lg md:prose-xl lg:prose-2xl max-w-none
//               prose-headings:font-semibold prose-headings:text-gray-900 prose-headings:tracking-tight
//               prose-h1:text-3xl md:prose-h1:text-4xl lg:prose-h1:text-5xl prose-h1:mb-6 prose-h1:mt-12
//               prose-h2:text-2xl md:prose-h2:text-3xl lg:prose-h2:text-4xl prose-h2:mb-4 prose-h2:mt-10
//               prose-h3:text-xl md:prose-h3:text-2xl lg:prose-h3:text-3xl prose-h3:mb-3 prose-h3:mt-8
//               prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg md:prose-p:text-xl
//               prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
//               prose-strong:text-gray-900 prose-strong:font-semibold
//               prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:space-y-2
//               prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:space-y-2
//               prose-li:text-gray-600 prose-li:text-lg md:prose-li:text-xl
//               prose-blockquote:border-l-4 prose-blockquote:border-gray-300
//               prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:my-6 prose-blockquote:text-lg md:prose-blockquote:text-xl
//               prose-code:text-pink-600 prose-code:bg-gray-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-base
//               prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-6
//               prose-img:rounded-lg prose-img:my-8 prose-img:w-full"
//             dangerouslySetInnerHTML={{ __html: blog.content }}
//           />
//         </motion.div>

//         {/* Metadata Footer */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6, delay: 0.5 }}
//           className="mt-16 pt-8 border-t border-gray-200 text-sm text-gray-500"
//         >
//           <p>Slug: <span className="font-mono text-gray-700">{blog.slug}</span></p>
//         </motion.div>
//       </div>
//     </div>
//   );
// }



"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";
import Spinner from "@/app/components/loader/Spinner";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/admin/blogs/${slug}`);
        setBlog(res.data.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="relative bg-white m-4 rounded-3xl md:m-12 md:py-16 min-h-screen">
        <Image
          src="/images/bgPaws1.png"
          alt="bgpaws"
          fill
          className="h-full w-full absolute inset-0 opacity-30"
        />
        <Spinner />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="relative bg-white m-4 rounded-3xl md:m-12 md:py-16 min-h-screen">
        <Image
          src="/images/bgPaws1.png"
          alt="bgpaws"
          fill
          className="h-full w-full absolute inset-0 opacity-30 object-cover"
        />
        <div className="relative z-10 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Blog not found
            </h2>
            <p className="text-gray-500">
              The blog post you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const createdDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const updatedDate = new Date(blog.updatedAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative bg-white m-4 rounded-3xl md:m-12 py-8 md:py-16 min-h-screen">
      <Image
        src="/images/bgPaws1.png"
        alt="bgpaws"
        fill
        className="h-full w-full absolute inset-0 opacity-30 object-cover rounded-3xl"
      />

      <div className="relative z-10 container mx-auto px-4 md:px-24 xl:px-20">
        {/* Blog Card Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Cover Image Section */}
          <div className="relative w-full h-[250px] md:h-[400px] bg-gray-100">
            <Image
              src={blog.innerImage}
              alt={blog.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-3 drop-shadow-lg"
              >
                {blog.title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap items-center gap-2 md:gap-3 text-white/90 text-xs md:text-sm"
              >
                <span className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {createdDate}
                </span>
                {createdDate !== updatedDate && (
                  <span className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Updated {updatedDate}
                  </span>
                )}
              </motion.div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-10 lg:p-12">
            {/* Excerpt */}
            {blog.excerpt && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8 md:mb-10 bg-gray-50 p-4 md:p-6 rounded-xl"
              >
                <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                  {blog.excerpt}
                </p>
              </motion.div>
            )}

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <article
                className="prose prose-base md:prose-lg lg:prose-xl max-w-none
                  prose-headings:font-semibold prose-headings:text-gray-900 prose-headings:tracking-tight
                  prose-h1:text-2xl md:prose-h1:text-3xl lg:prose-h1:text-4xl prose-h1:mb-4 prose-h1:mt-8
                  prose-h2:text-xl md:prose-h2:text-2xl lg:prose-h2:text-3xl prose-h2:mb-3 prose-h2:mt-6
                  prose-h3:text-lg md:prose-h3:text-xl lg:prose-h3:text-2xl prose-h3:mb-2 prose-h3:mt-5
                  prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-base md:prose-p:text-lg
                  prose-a:text-[#F91F54] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4 prose-ul:space-y-2
                  prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4 prose-ol:space-y-2
                  prose-li:text-gray-600 prose-li:text-base md:prose-li:text-lg
                  prose-blockquote:border-l-4 prose-blockquote:border-[#F91F54]
                  prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:my-4 prose-blockquote:text-base md:prose-blockquote:text-lg
                  prose-code:text-[#F91F54] prose-code:bg-gray-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-4
                  prose-img:rounded-lg prose-img:my-6 prose-img:w-full prose-img:shadow-md"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </motion.div>

            {/* Metadata Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 pt-6 border-t border-gray-200"
            >
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Slug: <span className="font-mono text-gray-800 font-medium">{blog.slug}</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}