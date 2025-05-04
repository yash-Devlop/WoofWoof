import next from "next";
import { NextResponse } from "next/server";

export async function POST() {
  console.log("start");
  const response = await NextResponse.json({ message: "Logout Successfully." });
  response.cookies.set("auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
    expires: new Date(0), // Expire the cookie
  });

  return response;
}
