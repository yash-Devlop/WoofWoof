import Aos from "aos";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NewsAndBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchBlogdata = async () => {
      try {
        const response = await axios.get("/api/admin/blogs");
        setBlogData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogdata();
  }, []);

  return (
    <div data-aos="zoom-in" className="w-full relative">
      <div className="bg-white rounded-3xl m-4 md:m-12 py-8 md:py-20">
        <div className="px-4 md:px-24 xl:px-40">
          <div className="flex w-full justify-center mb-8">
            <h2 className="text-4xl font-semibold">News & Blogs</h2>
          </div>

          <div className="relative w-full ">
            {!loading && (
              <Image
                src="/images/3dAnimatedDog.png"
                alt="animatedDog"
                width={350}
                height={300}
                className="hidden lg:block absolute z-10 -left-26.5 -top-38"
              />
            )}

            {loading ? (
              <p className="text-center text-gray-500">Loading blogs...</p>
            ) : (
              <div className="overflow-x-auto scrollbar-hide ">
                <div className="gap-4 flex lg:px-25">
                  {blogData.slice(0, 3).map((blog) => {
                    const date = new Date(blog.createdAt);
                    const formattedDate = `${String(date.getDate()).padStart(
                      2,
                      "0"
                    )}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(
                      date.getFullYear()
                    ).slice(-2)}`;

                    return (
                      <div key={blog._id} className=" flex gap-4 py-2">
                        <Link
                          href={`/blog/${blog.slug}`}
                          className="block text-base font-semibold text-blue-600 hover:text-blue-800 transition-colors line-clamp-2"
                        >
                          <div className="w-[320px] h-[300px] gap-4 bg-white shadow-md rounded-2xl overflow-hidden flex flex-col">
                            {/* Image */}
                            <div className="w-full h-[220px] relative  z-5">
                              <Image
                                src={blog.coverImage}
                                alt={blog.title}
                                fill
                                className="object-cover"
                              />
                            </div>

                            {/* Content */}

                            <div className="flex-1 flex flex-col justify-between p-4">
                              <div>
                                <div className="text-gray-600 text-sm mb-2">
                                  {formattedDate}
                                </div>

                                <div>{blog.title}</div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {/* View All Button */}
            <div className="flex w-full justify-end mt-8">
              <Link href="/blog" className="px-6 py-1 text-black underline">
                View All...
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAndBlogs;
