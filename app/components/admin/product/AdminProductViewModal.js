// "use client";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   Divider,
// } from "@mui/material";

// export default function AdminProductViewModal({ open, onClose, product }) {
//   if (!product) return null;

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>View Product Details</DialogTitle>
//       <DialogContent dividers>
//         <Typography variant="subtitle1">
//           <strong>Name:</strong> {product.name}
//         </Typography>
//         <Divider sx={{ my: 1 }} />

//         <Typography variant="subtitle1">
//           <strong>Category:</strong> {product.Category?.name || "N/A"}
//         </Typography>
//         <Divider sx={{ my: 1 }} />

//         <Typography variant="subtitle1">
//           <strong>Price:</strong> ₹{product.price}
//         </Typography>
//         <Divider sx={{ my: 1 }} />

//         <Typography variant="subtitle1">
//           <strong>Stock:</strong> {product.popularity}
//         </Typography>
//         <Divider sx={{ my: 1 }} />

//         <Typography variant="subtitle1">
//           <strong>Description:</strong>
//         </Typography>
//         {product.description ? (
//           <>
//             <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
//               <strong>Core Instruction:</strong>{" "}
//               {product.description.coreInstruction || "N/A"}
//             </Typography>
//             <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
//               <strong>Detailed Info:</strong>{" "}
//               {product.description.detailedInfo || "N/A"}
//             </Typography>
//             <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
//               <strong>Additional Details:</strong>{" "}
//               {product.description.additionalDetails || "N/A"}
//             </Typography>
//           </>
//         ) : (
//           <Typography variant="body2">No description</Typography>
//         )}

//         {product.images?.length > 0 && (
//           <>
//             <Divider sx={{ my: 2 }} />
//             <Typography variant="subtitle1">
//               <strong>Images:</strong>
//             </Typography>
//             <div
//               style={{
//                 display: "flex",
//                 flexWrap: "wrap",
//                 gap: "10px",
//                 marginTop: "10px",
//               }}
//             >
//               {product.images.map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={`/${img.url}`}
//                   alt={img.altText || "Product Image"}
//                   style={{
//                     width: 100,
//                     height: 100,
//                     objectFit: "cover",
//                     borderRadius: 6,
//                     border: "1px solid #ccc",
//                   }}
//                 />
//               ))}
//             </div>
//           </>
//         )}
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={onClose} variant="contained" color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";

export default function AdminProductViewModal({ open, onClose, product }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!product) return null;

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>View Product Details</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1">
            <strong>Name:</strong> {product.name}
          </Typography>
          <Divider sx={{ my: 1 }} />

          <Typography variant="subtitle1">
            <strong>Category:</strong> {product.Category?.name || "N/A"}
          </Typography>
          <Divider sx={{ my: 1 }} />

          <Typography variant="subtitle1">
            <strong>Price:</strong> ₹{product.price}
          </Typography>
          <Divider sx={{ my: 1 }} />

          <Typography variant="subtitle1">
            <strong>Stock:</strong> {product.popularity}
          </Typography>
          <Divider sx={{ my: 1 }} />

          <Typography variant="subtitle1">
            <strong>Description:</strong>
          </Typography>
          {product.description ? (
            <>
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                <strong>Description:</strong>{" "}
                {product.description.additionalDetails || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                <strong>Core Instruction:</strong>{" "}
                {product.description.coreInstruction || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                <strong>Detailed Info:</strong>{" "}
                {product.description.detailedInfo || "N/A"}
              </Typography>
            </>
          ) : (
            <Typography variant="body2">No description</Typography>
          )}

          {product.images?.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1">
                <strong>Images:</strong>
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.url}
                    alt={img.altText || "Product Image"}
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedImage(`/${img.url}`)}
                  />
                ))}
              </div>
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Preview Dialog */}
      <Dialog
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent dividers sx={{ textAlign: "center" }}>
          <img
            src={selectedImage}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
              borderRadius: 8,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedImage(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
