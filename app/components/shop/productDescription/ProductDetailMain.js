"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "@/store/slices/user/productSlice";
import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addToCart } from "@/store/slices/user/cartSlice";
import QuantitySelector from "./QuantitySelector";

const normalizeUrl = (url) => {
  if (!url) return "/images/logo.png";
  if (url.startsWith("//")) return url.replace(/^\/\//, "/");
  if (!url.startsWith("/")) return "/" + url;
  return url;
};

export default function ProductDetailMain({ productId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const productstate = useSelector((state) => state.product);
  const { loading, error, product } = productstate.productDetails;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const productImages = product?.images || ["/images/logo.png"];
  const [mainImage, setMainImage] = useState("/images/logo.png");

  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(product.images[0].url || "/images/logo.png");
    }
  }, [product]);

  useEffect(() => {
    if (productId) dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    if (product) {
      if (product.colors?.length > 0 && !selectedColor) {
        setSelectedColor(product.colors[0]);
      }
      if (product.sizes?.length > 0 && !selectedSize) {
        setSelectedSize(product.sizes[0]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId,
        quantity,
        size: selectedSize || null,
        color: selectedColor
          ? { name: selectedColor.name, code: selectedColor.code }
          : null,
      })
    );
    console.log(
      {
        productId,
        quantity,
        size: selectedSize || null,
        color: selectedColor
          ? { name: selectedColor.name, code: selectedColor.code }
          : null,
      }
    )
  };

  const handleBuy = async () => {
    const result = await dispatch(
      addToCart({
        productId,
        quantity,
        size: selectedSize || null,
        color: selectedColor
          ? { name: selectedColor.name, code: selectedColor.code }
          : null,
      })
    );

    if (addToCart.fulfilled.match(result)) {
      router.push("/cart");
    } else {
      toast.error(result.payload?.message || "Unable to add to cart");
    }
  };

  if (loading) return <p className="p-8 text-center">Loading…</p>;
  if (error) return <p className="p-8 text-center text-red-600">{error}</p>;
  if (!product) return null;

  return (
    <div className="relative bg-white m-4 rounded-3xl md:m-12 md:py-16 min-h-screen">
      <Image
        src="/images/bgPaws1.png"
        alt="bgpaws"
        fill
        className="h-full w-full absolute inset-0 opacity-30"
      />

      <div className="relative z-10 container mx-auto px-4 py-4 md:px-24 xl:px-20 rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* LEFT: Product Images */}
          <div className="md:sticky top-10">
            <div className="w-full md:h-[500px] bg-gray-100 flex items-center justify-center rounded-3xl overflow-hidden">
              <Image
                src={mainImage}
                width={400}
                height={400}
                alt="Product"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex gap-4 mt-4">
              {productImages.map((image, idx) => (
                <div
                  key={idx}
                  onClick={() => setMainImage(image.url)}
                  className="w-20 h-20 bg-gray-100 rounded-md p-1 cursor-pointer hover:scale-110 transition-transform"
                >
                  <img
                    src={normalizeUrl(image?.url)}
                    alt={image?.alt || "thumbnail"}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="mx-auto max-w-md">
            <h2 className="text-[#F91F54] font-semibold text-sm">Woof Woof</h2>
            <h1 className="text-2xl font-bold mt-1">{product?.name}</h1>
            <div className="flex items-center gap-2 mt-2 text-sm text-yellow-500">
              <p>{product?.reviews?.length} reviews</p>
              <p
                className={
                  product?.inStock
                    ? "text-green-600 font-bold"
                    : "text-red-600 font-bold"
                }
              >
                {product?.inStock ? "IN STOCK" : "SOLD OUT"}
              </p>
            </div>

            <div className="mt-3">
              <span className="text-xl font-bold">{`₹ ${product?.price}`}</span>
              <span className="line-through text-gray-400 ml-2">{`₹ ${product?.markedPrice ?? product?.price + 50
                }`}</span>
            </div>

            <div className="mt-3 border border-gray-300"></div>

            {/* COLOR SELECTION */}
            {product?.colors?.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <div className="font-medium">Colours:</div>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      title={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-7 h-7 rounded-full border-2 cursor-pointer transition-transform ${selectedColor?.code === color.code
                        ? "scale-110 border-[#F91F54]"
                        : "border-gray-300"
                        }`}
                      style={{ backgroundColor: color.code }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* SIZE SELECTION */}
            {product?.sizes?.length > 0 && (
              <div className="mt-3 flex gap-3 items-center flex-wrap">
                <label className="font-medium">Size:</label>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`border rounded px-2 py-1 text-sm hover:bg-[#F91F54] hover:text-white transition ${selectedSize === size
                        ? "bg-[#F91F54] text-white"
                        : "text-gray-700"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY & ACTIONS */}
            <div className="flex items-center gap-4 mt-6">
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
              <button
                onClick={handleBuy}
                className="bg-[#F91F54] hover:bg-[#d20037] text-white px-4 py-1 rounded cursor-pointer"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-[#F91F54] hover:bg-[#d20037] text-white px-4 py-1 rounded cursor-pointer"
              >
                Add to cart
              </button>
            </div>

            {/* DELIVERY INFO */}
            <div className="mt-6 border rounded p-4 space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <b>Free Delivery:</b>
                <span className="text-gray-600">
                  Free shipping for all products
                </span>
              </div>
              <div className="flex items-start gap-2">
                <b>Delivery ETA:</b>
                <span className="text-gray-600">
                  Estimate 5–7 business days
                </span>
              </div>
            </div>

            {/* ACCORDION DETAILS */}
            <div className="mt-8">
              {["Description", "Details", "Care Instruction"].map((section, i) => {
                const descMap = {
                  Description: product?.description?.additionalDetails,
                  Details: product?.description?.detailedInfo,
                  "Care Instruction": product?.description?.coreInstruction,
                };
                return (
                  <Accordion key={i}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{section}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {descMap[section] ||
                        `No additional ${section.toLowerCase()} available.`}
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
