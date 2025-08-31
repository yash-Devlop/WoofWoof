"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";

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
    return <p className="text-center py-20 text-gray-500">Loading blog...</p>;
  }

  if (!blog) {
    return <p className="text-center py-20 text-red-500">Blog not found.</p>;
  }

  const createdDate = new Date(blog.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  const updatedDate = new Date(blog.updatedAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background paws */}
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
              y: [0, 20, 40, 20, 1],
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
        <div className="absolute bottom-3/5 lg:bottom-1 right-10 lg:right-1/2">
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

        {/* Right-side floating vector */}
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

      {/* Blog Content */}
      <div className="relative z-10 max-w-4xl mx-auto py-12 px-4">
        {/* Title */}
        <h1 className="text-4xl text-[#ff0047] font-bold mb-2">{blog.title}</h1>

        {/* Slug & Dates */}
        <p className="text-gray-500 text-sm">
          Slug: <span className="italic">{blog.slug}</span>
        </p>
        <p className="text-gray-500 text-sm">
          Published: {createdDate} | Updated: {updatedDate}
        </p>

        {/* Cover Image */}
        <div className="my-6">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            width={800}
            height={500}
            className="rounded-xl shadow-md"
          />
        </div>

        {/* Excerpt */}
        <p className="text-lg text-gray-700 mb-6">{blog.excerpt}</p>

        {/* Content */}
        <article
          className="prose lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
}
