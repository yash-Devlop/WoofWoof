import React from "react";


export default function ProductDetail({ params }) {
  const { productId } = params;

  // In a real app, you'd fetch product details using the productId here
  return (
    <div>
      <h1>Product ID: {productId}</h1>
      <p>This is the product description for product ID {productId}.</p>
    </div>
  );
}
