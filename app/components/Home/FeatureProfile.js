import Image from "next/image";
import React from "react";

const FeatureProfile = () => {
  const featuredProfileData = [
    {
      id: 1,
      name: "Luke",
      image: "/images/featuredDog1.jpg",
      gender: "Male",
      ethnicity: "Indian",
      breed: "Pekingese",
      city: "delhi",
    },
    {
      id: 2,
      name: "Max",
      image: "/images/featuredDog2.jpg",
      gender: "Male",
      ethnicity: "Indian",
      breed: "Pekingese",
      city: "delhi",
    },
    {
      id: 1,
      name: "Luke",
      image: "/images/featuredDog3.jpg",
      gender: "Male",
      ethnicity: "Indian",
      breed: "Pekingese",
      city: "delhi",
    },
    {
      id: 1,
      name: "Luke",
      image: "/images/featuredDog4.jpg",
      gender: "Male",
      ethnicity: "Indian",
      breed: "Pekingese",
      city: "delhi",
    },
  ];

  return (
    <div className="w-full relative py-16">
      <div className=" px-4 md:px-24 xl:px-40">
        <div className="flex w-full justify-between mb-8">
          <h2 className=" text-4xl font-semibold">Featured Profiles</h2>
          <div className=" flex  gap-3">
            <div className=" cursor-pointer">
              <svg
                width="35"
                height="35"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="40"
                  height="40"
                  rx="20"
                  transform="matrix(-1 0 0 1 40 0)"
                  fill="black"
                />
                <path
                  d="M23 26L17 20L23 14"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className=" cursor-pointer
            "
            >
              <svg
                width="35"
                height="35"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="20" fill="black" />
                <path
                  d="M17 26L23 20L17 14"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className=" grid md:grid-cols-2 gap-4 lg:grid-cols-4 px-8">
          {featuredProfileData.map((profile, index) => (
            <div key={index} className="">
              <Image
                src={profile.image}
                alt={profile.image}
                width={300}
                height={300}
                className=" rounded-t-2xl object-cover w-full h-[250px]"
              />
              <div className=" flex justify-between p-4 rounded-b-2xl bg-gray-100 mt-1 mb-3">
                <div className=" text-lg font-semibold">{profile.name}</div>
                <div className=" cursor-pointer">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="24" height="24" rx="12" fill="white" />
                    <path
                      d="M7.33203 12H16.6654"
                      stroke="#FD7E14"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 7.33325L16.6667 11.9999L12 16.6666"
                      stroke="#FD7E14"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className=" px-6 py-4 bg-gray-200 rounded-2xl space-y-4">
                <div className=" flex justify-between">
                  <h3 className=" text-xl font-bold">Gender</h3>
                  <h3 className=" text-xl font-bold">{profile.gender}</h3>
                </div>
                <div className=" flex justify-between">
                  <h3 className=" text-xl font-bold">Ethnicity</h3>
                  <h3 className=" text-xl font-bold">{profile.ethnicity}</h3>
                </div>
                <div className=" flex justify-between">
                  <h3 className=" text-xl font-bold">Breed</h3>
                  <h3 className=" text-xl font-bold">{profile.breed}</h3>
                </div>
                <div className=" flex justify-between">
                  <h3 className=" text-xl font-bold">City</h3>
                  <h3 className=" text-xl font-bold">{profile.city}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureProfile;
