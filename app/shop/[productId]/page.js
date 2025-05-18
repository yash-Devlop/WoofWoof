import React from "react";
import ProductDescriptionHeader from "@/app/components/shop/productDescription/ProductDescriptionHeader";
import ProductDetailMain from "@/app/components/shop/productDescription/ProductDetailMain";
import SimilarProducts from "@/app/components/shop/productDescription/SimilarProducts";
import ReviewSection from "@/app/components/shop/productDescription/ReviewSection";
import Footer from "@/app/components/Home/Footer";

export default async function ProductDetail({ params }) {
  const { productId } = await params;

  // In a real app, you'd fetch product details using the productId here
  return (
    <div className=" bg-[#EEEEEE]">
      <ProductDescriptionHeader />
      <ProductDetailMain productId={productId} />
      <SimilarProducts />
      <ReviewSection />
      <Footer />
    </div>
  );
}
