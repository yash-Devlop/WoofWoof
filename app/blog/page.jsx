"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogPage() {
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);

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

  return loading ? (
    <p className="text-center text-gray-500">Loading blogs...</p>
  ) : (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background paws image */}
      <div className="absolute inset-0 opacity-60">
        <Image
          src="/images/pinkPaws.png"
          alt="background paws"
          fill
          className="object-top w-full h-full"
        />
      </div>

      {/* Floating Vectors */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top floating vector */}
        <div className="absolute top-0 left-0">
          <motion.div
            initial={{ x: 20, y: -10, scale: 1 }}
            animate={{
              x: [0, -30, -50, -30, 0],
              y: [0, 20, 40, 20, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Image
              src="/images/testimonialBg.png"
              alt="floatingVector1"
              width={200}
              height={200}
              className="object-contain h-[100px] w-[100px] lg:h-[150px] lg:w-[150px]"
            />
          </motion.div>
        </div>

        {/* Bottom floating vector */}
        <div className="absolute bottom-3/5 lg:bottom-1/5 right-4 lg:right-1/2">
          <motion.div
            initial={{ x: 10, y: -10, scale: 1 }}
            animate={{
              x: [0, 20, 40, 20, 0],
              y: [0, -10, 0, 10, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Image
              src="/images/transitionBg.png"
              alt="floatingVector2"
              width={200}
              height={200}
              className="object-contain h-[100px] w-[100px] lg:h-[150px] lg:w-[150px]"
            />
          </motion.div>
        </div>

        <div className="absolute bottom-1/2 right-0">
          <motion.div
            initial={{ x: -20, y: -30, scale: 1 }}
            animate={{
              x: [0, -30, -50, -30, 0],
              y: [0, 20, 40, 20, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Image
              src="/images/testimonialBg.png"
              alt="floatingVector3"
              width={200}
              height={200}
              className="object-contain h-[100px] w-[100px] lg:h-[150px] lg:w-[150px]"
            />
          </motion.div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="relative z-10 rounded-3xl m-4 md:m-1 py-6">
        <div className="px-4 md:px-24 xl:px-40">
          <div className="flex w-full justify-center mb-8">
            <h2 className="text-4xl font-semibold text-[#ff0047]">All Blogs</h2>
          </div>

          {blogData.length === 0 ? (
            <p className="text-center text-gray-500">No blogs found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogData
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((blog) => {
                  const date = new Date(blog.createdAt);
                  const formattedDate = `${String(date.getDate()).padStart(
                    2,
                    "0"
                  )}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(
                    date.getFullYear()
                  ).slice(-2)}`;

                  return (
                    <div
                      key={blog._id}
                      className="bg-white z-20 shadow-md rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
                    >
                      {/* Blog Image */}
                      <div className="w-full h-[220px] relative">
                        <Image
                          src={blog.coverImage}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Blog Content */}
                      <div className="flex-1 flex flex-col justify-between p-4">
                        <div>
                          <div className="text-gray-600 text-sm mb-2">
                            {formattedDate}
                          </div>
                          <Link
                            href={`/blog/${blog.slug}`}
                            className="block text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors line-clamp-2"
                          >
                            {blog.title}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
