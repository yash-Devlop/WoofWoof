// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// // import { updateProduct } from "@/store/slices/admin/adminProductSlice";
// import toast from "react-hot-toast";
// import { updateProduct } from "@/store/slices/admin/adminProductSlice";

// const AdminEditProductModal = ({ open, onClose, product }) => {
//   const dispatch = useDispatch();

//   const categories = useSelector((state) => state.adminCategory.categories);

//   // const categories = [
//   //   { _id: "1", name: "Pet Toy" },
//   //   { _id: "2", name: "Pet Accessories" },
//   //   { _id: "3", name: "Birthday Gift" },
//   // ];

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     categoryName: "",
//     tags: "",
//   });

//   useEffect(() => {
//     if (product) {
//       setFormData({
//         name: product.name || "",
//         price: product.price || "",
//         categoryName: product.Category?.name || "",
//         tags: product.tags?.join(", ") || "",
//       });
//     }
//   }, [product]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = () => {
//     if (
//       !formData.name ||
//       !formData.price ||
//       !formData.categoryName ||
//       !formData.tags
//     ) {
//       toast.error("All fields are required");
//       return;
//     }

//     const updatedData = {
//       id: product._id,
//       updatedFields: {
//         name: formData.name,
//         price: formData.price,
//         categoryName: formData.categoryName,
//         tags: formData.tags.split(",").map((tag) => tag.trim()),
//       },
//     };

//     dispatch(updateProduct(updatedData))
//       .unwrap()
//       .then(() => {
//         toast.success("Product updated successfully!");
//       })
//       .catch(() => {
//         toast.error("Failed to update product");
//       });
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: 600,
//           bgcolor: "background.paper",
//           borderRadius: 4,
//           boxShadow: 24,
//           p: 4,
//         }}
//       >
//         <Typography variant="h6" mb={2}>
//           Edit Product
//         </Typography>
//         <TextField
//           fullWidth
//           label="Product Name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           margin="normal"
//         />
//         <TextField
//           fullWidth
//           label="Price"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//           type="number"
//           margin="normal"
//         />
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Category</InputLabel>
//           <Select
//             name="categoryName"
//             value={formData.categoryName}
//             onChange={handleChange}
//             label="Category"
//           >
//             {categories.map((cat) => (
//               <MenuItem key={cat._id} value={cat.name}>
//                 {cat.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <TextField
//           fullWidth
//           label="Tags (comma-separated)"
//           name="tags"
//           value={formData.tags}
//           onChange={handleChange}
//           margin="normal"
//         />

//         <Box mt={2} display="flex" justifyContent="space-between">
//           <Button onClick={onClose} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleUpdate} variant="contained" color="primary">
//             Update Product
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default AdminEditProductModal;

"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  updateProduct,
  fetchAllProductsAdmin,
} from "@/store/slices/admin/adminProductSlice";
import ImageUploader from "../ImageUploader";

const AdminEditProductModal = ({ open, onClose, product }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.adminCategory.categories);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    markedPrice: "",
    rating: "",
    categoryName: "",
    tags: "",
    description: {
      coreInstruction: "",
      detailedInfo: "",
      additionalDetails: "",
    },
  });

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        markedPrice: product.markedPrice || "",
        rating: product.rating || "",
        categoryName: product.Category?.name || "",
        tags: product.tags?.join(", ") || "",
        description: {
          coreInstruction: product.description?.coreInstruction || "",
          detailedInfo: product.description?.detailedInfo || "",
          additionalDetails: product.description?.additionalDetails || "",
        },
      });
      setImages([]); // Or set to default preview images if desired
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "rating") {
      if (value === "") {
        setFormData((prev) => ({ ...prev, rating: "" }));
        return;
      }

      const num = Number(value);
      if (!isNaN(num) && num >= 0 && num <= 5) {
        setFormData((prev) => ({ ...prev, rating: value }));
      }
    } else if (name.startsWith("description.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        description: {
          ...prev.description,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    const {
      name,
      price,
      markedPrice,
      rating,
      categoryName,
      tags,
      description,
    } = formData;

    if (
      !name ||
      !price ||
      !markedPrice ||
      rating === "" ||
      !categoryName ||
      !tags
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (rating < 0 || rating > 5) {
      toast.error("Rating must be between 0 and 5.");
      return;
    }

    const updatedFormData = new FormData();
    updatedFormData.append("id", product._id);
    updatedFormData.append("name", name);
    updatedFormData.append("price", price);
    updatedFormData.append("markedPrice", markedPrice);
    updatedFormData.append("rating", rating);
    updatedFormData.append("categoryName", categoryName);
    updatedFormData.append("tags", tags);
    updatedFormData.append(
      "description.coreInstruction",
      description.coreInstruction
    );
    updatedFormData.append(
      "description.detailedInfo",
      description.detailedInfo
    );
    updatedFormData.append(
      "description.additionalDetails",
      description.additionalDetails
    );

    images.forEach((image) => {
      updatedFormData.append("images", image);
    });

    try {
      await dispatch(updateProduct(updatedFormData)).unwrap();
      toast.success("Product updated successfully");
      dispatch(fetchAllProductsAdmin());
      onClose();
    } catch (error) {
      toast.error(error?.message || "Failed to update product");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          maxHeight: "90vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          Edit Product
        </Typography>

        <TextField
          fullWidth
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Marked Price"
          name="markedPrice"
          type="number"
          value={formData.markedPrice}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Rating"
          name="rating"
          type="number"
          value={formData.rating}
          onChange={handleChange}
          inputProps={{ min: 0, max: 5, step: 0.1 }}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            label="Category"
          >
            {categories?.map((cat) => (
              <MenuItem key={cat._id} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Tags (comma-separated)"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          margin="normal"
        />

        <Typography variant="subtitle1" mt={3}>
          Description
        </Typography>
        <TextField
          fullWidth
          label="Description"
          name="description.additionalDetails"
          value={formData.description.additionalDetails}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Core Instruction"
          name="description.coreInstruction"
          value={formData.description.coreInstruction}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Detailed Info"
          name="description.detailedInfo"
          value={formData.description.detailedInfo}
          onChange={handleChange}
          margin="normal"
        />

        {product?.images?.length > 0 && (
          <>
            <Typography variant="subtitle2" mt={1} mb={1}>
              Existing Images:
            </Typography>
            <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
              {product.images.map((img, idx) => (
                <Box
                  key={idx}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid #ccc",
                  }}
                >
                  <img
                    src={
                      img.url.startsWith("/uploads") ? img.url : `/${img.url}`
                    }
                    alt={img.altText || `image-${idx}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </>
        )}

        <Typography variant="subtitle1" mt={2}>
          Upload New Images (optional)
        </Typography>
        <ImageUploader images={images} setImages={setImages} />

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update Product
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AdminEditProductModal;
