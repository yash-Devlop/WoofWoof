// hooks/useRazorpayLoader.js
import { useEffect, useState } from "react";

export default function useRazorpayLoader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        setIsLoaded(true);
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay SDK");
      };
      document.body.appendChild(script);
    } else {
      setIsLoaded(true); // Already loaded
    }
  }, []);

  return isLoaded;
}
