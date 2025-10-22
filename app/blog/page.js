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

  return (
    <>
      <NavBar />
      <div className="pt-28">
        <div className="relative bg-white m-4 rounded-3xl md:m-12 py-8 md:py-16 min-h-screen">
          <Image
            src="/images/bgPaws1.png"
            alt="bgpaws"
            fill
            className="h-full w-full absolute inset-0 opacity-30 object-cover rounded-3xl"
          />

          <div className="relative z-10 container mx-auto px-4 md:px-24 xl:px-20">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 md:mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#F91F54] mb-3">
                Our Blog
              </h1>
              <p className="text-base md:text-lg text-gray-600">
                Discover stories, tips, and insights about pet care and more
              </p>
            </motion.div>

            {/* Filter Tabs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex gap-3 md:gap-4 mb-8 md:mb-12 flex-wrap"
            >
              {["All", "Blogs", "News"].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-5 py-2 rounded-full font-medium transition-all duration-300 text-sm md:text-base ${activeType === type
                    ? "bg-[#F91F54] text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow border border-gray-200"
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
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-16 text-center"
              >
                <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-6">
                  <Image
                    src="/images/logo.png"
                    alt="Woof Woof"
                    fill
                    className="object-contain opacity-40"
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  No {activeType !== "All" ? activeType : "Blogs"} Yet
                </h3>
                <p className="text-base md:text-lg text-gray-600 mb-6 max-w-md mx-auto">
                  We&apos;re working on creating amazing content for you. Check back soon!
                </p>
                <button
                  onClick={() => router.push("/")}
                  className="inline-flex items-center gap-2 bg-[#F91F54] text-white px-6 py-2.5 rounded-full font-semibold 
             hover:bg-[#d20037] transition-all duration-300 ease-in-out shadow-lg 
             hover:scale-105"
                >
                  Back to Home
                  <span>
                    <Image
                      src="/images/logo2.png"
                      width={40}
                      height={40}
                      alt="logo"
                      className="transition-all duration-300 ease-in-out"
                    />
                  </span>
                </button>


              </motion.div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200"
                    >
                      <Link href={`/blog/${blog.slug}`}>
                        {/* Blog Image */}
                        <div className="relative h-56 md:h-64 w-full overflow-hidden">
                          <Image
                            src={blog.coverImage}
                            alt={blog.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-110"
                          />
                          {/* Type Badge */}
                          <div className="absolute top-4 right-4">
                            <span className="bg-[#F91F54] text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold shadow-lg">
                              {blog.type}
                            </span>
                          </div>
                        </div>

                        {/* Blog Content */}
                        <div className="p-5 md:p-6">
                          {/* Date */}
                          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mb-3">
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
                          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-[#F91F54] transition-colors">
                            {blog.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-gray-600 text-sm md:text-base line-clamp-3 mb-4">
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
        </div>
      </div>
    </>
  );
}