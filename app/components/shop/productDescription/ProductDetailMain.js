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
import StarRating from "./StarRating";
import QuantitySelector from "./QuantitySelector";
import toast from "react-hot-toast";
import { addToCart } from "@/store/slices/user/cartSlice";

const normalizeUrl = (url) => {
  if (!url) return "/images/logo.png"; // fallback image path
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

  const handleAddToCart = () => {
    dispatch(addToCart({ productId, quantity }));
  };

  const handleBuy = async () => {
    const result = await dispatch(addToCart({ productId, quantity }));

    // If the action was fulfilled (not rejected)
    if (addToCart.fulfilled.match(result)) {
      toast.success("Product added to cart!");
      router.push("/cart");
    } else {
      toast.error(result.payload?.message || "Unable to add to cart");
    }
  };

  const productImages = product?.images || ["/images/logo.png"];
  const [mainImage, setMainImage] = useState("/images/logo.png"); // default fallback image

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setMainImage(product.images[0].url || "/images/logo.png");
    }
  }, [product]);

  useEffect(() => {
    if (productId) dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  if (loading) return <p className="p-8 text-center">Loading…</p>;
  if (error) return <p className="p-8 text-center text-red-600">{error}</p>;
  if (!product) return null;

  return (
    <div className="relative bg-white m-4 rounded-3xl md:m-12 md:py-16 min-h-screen">
      <Image
        src="/images/bgPaws1.png"
        alt="bgpaws"
        fill
        className=" h-full w-full absolute inset-0 opacity-30"
      />
      {/* Background paw prints */}
      {/* <div className="absolute inset-0 z-0 bg-[url('/paws-bg.png')] bg-no-repeat bg-contain md:bg-[length:200px_200px] opacity-10 pointer-events-none" /> */}

      <div className="relative z-10 container mx-auto px-4 py-4 md:px-24 xl:px-20 rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Product Images */}
          <div className=" md:sticky top-10 ">
            <div className="w-full md:h-[500px] bg-gray-100 flex items-center justify-center rounded-3xl overflow-hidden">
              <Image
                src={`${mainImage}`}
                width={400}
                height={400}
                alt="Product"
                className="h-full w-full object-cover  "
              />
            </div>

            <div className="flex gap-4 mt-4">
              {productImages.map((image, idx) => (
                <div
                  key={idx}
                  onClick={() => setMainImage(image.url)}
                  className="w-20 h-20 bg-gray-100 rounded-md p-1 cursor-pointer"
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

          {/* Right: Product Info */}
          <div className=" mx-auto max-w-md">
            <h2 className="text-[#F91F54] font-semibold text-sm">Wed My Pet</h2>
            <h1 className="text-2xl font-bold mt-1">{product?.name}</h1>
            <div className="flex items-center gap-2 mt-2 text-sm text-yellow-500">
              {/* ★★★★☆ (50 Reviews)
              <span className="text-green-600 ml-2">In Stock</span> */}
              <StarRating
                rating={product.rating ?? 4.5}
                totalReviews={product.totalReviews ?? 10}
              />
            </div>

            <div className="mt-3">
              <span className="text-xl font-bold">{`₹ ${product?.price}`}</span>
              <span className="line-through text-gray-400 ml-2">{`₹ ${
                product?.markedPrice ?? product?.price + 50
              }`}</span>
            </div>

            {/* devider */}
            <div className=" mt-3 border-[0.5px] border-gray-300"></div>

            {/* Color selection */}
            <div className="mt-3 flex gap-2">
              <div className="block mb-1 font-medium pr-3">Colours:</div>
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-gray-300 cursor-pointer" />
                <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-gray-300 cursor-pointer" />
              </div>
            </div>

            {/* Size selection */}
            <div className="mt-3 flex gap-3 items-center">
              <label className="block mb-1 font-medium">Size:</label>
              <div className="flex gap-2">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className="border h-6 w-6  rounded text-sm hover:bg-[#F91F54] hover:text-white cursor-pointer"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Buy */}
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
              {/* <div className=" flex gap-4">
                <button
                  onClick={() => router.push("/cart")}
                  className="text-gray-500 text-xl cursor-pointer"
                >
                  <ShoppingCartOutlinedIcon />
                </button>
                <button className="text-gray-500 text-xl cursor-pointer">
                  <FavoriteBorderOutlinedIcon />
                </button>
              </div> */}
            </div>

            {/* Delivery info */}
            <div className="mt-6 border rounded p-4 space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <span>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_492_893)">
                      <path
                        d="M11.6668 31.6667C13.5078 31.6667 15.0002 30.1743 15.0002 28.3333C15.0002 26.4924 13.5078 25 11.6668 25C9.82588 25 8.3335 26.4924 8.3335 28.3333C8.3335 30.1743 9.82588 31.6667 11.6668 31.6667Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M28.3333 31.6667C30.1743 31.6667 31.6667 30.1743 31.6667 28.3333C31.6667 26.4924 30.1743 25 28.3333 25C26.4924 25 25 26.4924 25 28.3333C25 30.1743 26.4924 31.6667 28.3333 31.6667Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.3335 28.3335H7.00016C5.89559 28.3335 5.00016 27.4381 5.00016 26.3335V21.6668M3.3335 8.3335H19.6668C20.7714 8.3335 21.6668 9.22893 21.6668 10.3335V28.3335M15.0002 28.3335H25.0002M31.6668 28.3335H33.0002C34.1047 28.3335 35.0002 27.4381 35.0002 26.3335V18.3335M35.0002 18.3335H21.6668M35.0002 18.3335L30.5828 10.9712C30.2213 10.3688 29.5703 10.0002 28.8678 10.0002H21.6668"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 28H6.66667C5.5621 28 4.66667 27.1046 4.66667 26V21.3333M3 8H19.3333C20.4379 8 21.3333 8.89543 21.3333 10V28M15 28H24.6667M32 28H32.6667C33.7712 28 34.6667 27.1046 34.6667 26V18M34.6667 18H21.3333M34.6667 18L30.2493 10.6377C29.8878 10.0353 29.2368 9.66667 28.5343 9.66667H21.3333"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 11.8182H11.6667"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1.81836 15.4546H8.48503"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 19.0909H11.6667"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_492_893">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <div>
                  Free Delivery
                  <br />
                  <span className="text-gray-500 underline">
                    Enter your postal code for availability
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_492_898)">
                      <path
                        d="M33.3332 18.3333C32.9256 15.4003 31.565 12.6827 29.4609 10.5991C27.3569 8.51551 24.6261 7.18149 21.6893 6.80255C18.7525 6.4236 15.7725 7.02076 13.2085 8.50203C10.6445 9.98331 8.63859 12.2665 7.49984 15M6.6665 8.33329V15H13.3332"
                        stroke="black"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.6665 21.6666C7.0741 24.5996 8.43472 27.3172 10.5388 29.4008C12.6428 31.4844 15.3736 32.8184 18.3104 33.1974C21.2472 33.5763 24.2271 32.9792 26.7912 31.4979C29.3552 30.0166 31.3611 27.7334 32.4998 25M33.3332 31.6666V25H26.6665"
                        stroke="black"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_492_898">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <div>
                  Return Delivery
                  <br />
                  <span className="text-gray-500">Free 10 Days Return</span>
                </div>
              </div>
            </div>

            {/* devider */}
            <div className=" m-8 border-[0.5px] border-gray-300"></div>

            {/* delivery details */}
            <div>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {product?.description?.additionalDetails
                    ? product?.description?.additionalDetails
                    : `The ball’s lightweight yet durable design makes it ideal for
                  both indoor and outdoor environments. Bright colors and
                  pet-safe materials ensure it's easy to spot and safe for
                  chewing, chasing, or batting. It's an ideal toy for pet
                  parents who want to combine play with stimulation and
                  exercise.`}
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {product?.description?.detailedInfo
                    ? product?.description?.detailedInfo
                    : `The ball’s lightweight yet durable design makes it ideal for
                  both indoor and outdoor environments. Bright colors and
                  pet-safe materials ensure it's easy to spot and safe for
                  chewing, chasing, or batting. It's an ideal toy for pet
                  parents who want to combine play with stimulation and
                  exercise.`}
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">Care Instruction</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {product?.description?.coreInstruction
                    ? product?.description?.coreInstruction
                    : `The ball’s lightweight yet durable design makes it ideal for
                  both indoor and outdoor environments. Bright colors and
                  pet-safe materials ensure it's easy to spot and safe for
                  chewing, chasing, or batting. It's an ideal toy for pet
                  parents who want to combine play with stimulation and
                  exercise.`}
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
