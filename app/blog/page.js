"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import Spinner from "../components/loader/Spinner";

export default function BlogPage() {
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [activeType, setActiveType] = useState("All");

  const router = useRouter();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get("/api/admin/blogs");
        setBlogData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const filteredBlogs =
    activeType === "All"
      ? blogData
      : blogData.filter((blog) => blog.type === activeType);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        {/* <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#F91F54] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading blogs...</p>
        </div> */}
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pt-28">
        {/* Header Section */}
        <div className="container mx-auto px-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Our <span className="text-[#F91F54]">Blog</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover stories, tips, and insights about pet care and more
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center gap-4 mb-12 flex-wrap"
          >
            {["All", "Blogs", "News"].map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeType === type
                    ? "bg-[#F91F54] text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow"
                  }`}
              >
                {type}
              </button>
            ))}
          </motion.div>

          {/* No Blogs State */}
          {filteredBlogs.length === 0 ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center min-h-[400px] bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-16 shadow-xl"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <Image
                  src="/images/logo.png"
                  alt="Woof Woof"
                  fill
                  className="object-contain opacity-40"
                />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                No {activeType !== "All" ? activeType : "Blogs"} Yet
              </h3>
              <p className="text-lg text-gray-600 text-center max-w-md mb-8">
                We&apos;re working on creating amazing content for you. Check back soon!
              </p>
              <button
                onClick={() => router.push("/")}
                className="inline-flex items-center gap-2 bg-[#F91F54] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#d20037] transition-colors shadow-lg"
              >
                Back to Home
              </button>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((blog, index) => (
                  <motion.div
                    key={blog._id}
                    custom={index}
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <Link href={`/blog/${blog.slug}`}>
                      {/* Blog Image */}
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image
                          src={blog.coverImage}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                        {/* Type Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="bg-[#F91F54] text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                            {blog.type}
                          </span>
                        </div>
                      </div>

                      {/* Blog Content */}
                      <div className="p-6">
                        {/* Date and Author */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
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
                          <span>{formatDate(blog.createdAt)}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-[#F91F54] transition-colors">
                          {blog.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                          {blog.excerpt}
                        </p>

                        {/* Read More Link */}
                        <div className="flex items-center text-[#F91F54] font-semibold text-sm group">
                          <span>Read More</span>
                          <svg
                            className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          )}
        </div>

        {/* Featured Section - Can be added later */}

      </div>
    </>
  );
}