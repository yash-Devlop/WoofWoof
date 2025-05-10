"use client";
import { fetchProducts, setPage } from "@/store/slices/user/productSlice";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";

export default function PaginationSec() {
  const dispatch = useDispatch();
  const { pagination, totalPages } = useSelector((state) => ({
    pagination: state.product.pagination,
    totalPages: state.product.totalPages || 10,
  }));

  const handleChange = (event, value) => {
    dispatch(setPage(value));
    dispatch(fetchProducts()); // re-fetch products for the new page
  };

  return (
    <div className="flex justify-center items-center mt-6 space-x-2">
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={pagination}
          onChange={handleChange}
          color="primary"
        />
      </Stack>
    </div>
  );
}
