import Image from "next/image";
import React from "react";

const NewsAndBlogs = () => {
  const blogData = [
    {
      id: 1,
      image: "/images/Imglabel1.png",
      date: "24 March, 2025",
      link: "WedMyPet – Ask Anything Related to Your Furry Friend",
    },
    {
      id: 2,
      image: "/images/Imglabel2.png",
      date: "24 March, 2025",
      link: "Id tellus dignissim eu nisl aliquam. Massa id interdum ",
    },
    {
      id: 3,
      image: "/images/Imglabel3.png",
      date: "24 March, 2025",
      link: "mus cursus pellentesque blandit tortor suspendisse ornare",
    },
  ];

  return (
    <div className="w-full relative py-16">
      <div className=" px-4 md:px-24 xl:px-40">
        <div className="flex w-full justify-center mb-8">
          <h2 className=" text-4xl font-semibold">News & Blogs</h2>
        </div>
        <div className=" relative w-full">
          <Image
            src="/images/3dAnimatedDog.png"
            alt="animatedDog"
            width={350}
            height={300}
            className=" absolute -left-26.5 -top-30"
          />
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-25">
            {blogData.map((blog, index) => (
              <div key={index} className=" space-y-4">
                <Image
                  src={blog.image}
                  alt="imagelabel"
                  width={400}
                  height={300}
                  className=" rounded-t-2xl"
                />
                <div className=" text-gray-600">{blog.date}</div>
                <div className=" underline text-lg font-semibold cursor-pointer">
                  {blog.link}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAndBlogs;
