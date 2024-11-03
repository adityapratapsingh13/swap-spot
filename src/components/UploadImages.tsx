// "use client";
// import React, { useState } from "react";
// import { CldImage, CldUploadWidget } from "next-cloudinary";

// const UploadImages = () => {
//   const [publicId, setPublicId] = useState("");
//   return (
//     <>
//       {publicId && (
//         <CldImage src={publicId} alt={publicId} width={"300"} height={"180"} />
//       )}
//        <CldUploadWidget
//       uploadPreset="pvknlh5s"
//       onSuccess={({ event, info }) => {
//         if (event === "success") {
//           setPublicId(info?.public_id);
//         }
//       }}
//     >
//       {({ open }) => {
//         return (
//           <button
//             className="bg bg-red-600 p-4 rounded-md"
//             onClick={() => open()}
//           >
//             Upload an Image
//           </button>
//         );
//       }}
//     </CldUploadWidget>
//     </>
//   );
// };

// export default UploadImages;
