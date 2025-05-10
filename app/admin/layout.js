import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLayoutComponent from "../components/admin/AdminLayout";
export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  if (!token) {
    redirect("/adminPortal"); // No token → redirect to login
  }

  try {
    const decoded = await verifyToken(token);

    if (!decoded || decoded.role !== "admin") {
      return redirect("/"); // Not admin → redirect to homepage
    }

    return (
      <div className="">
        <AdminLayoutComponent>{children}</AdminLayoutComponent>
      </div>
    );
  } catch (err) {
    console.error("JWT error:", err.message);
    return redirect("/adminPortal"); // Invalid token
  }
}
