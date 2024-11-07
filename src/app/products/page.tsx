// "use client";

// import { useState, useEffect } from "react";
// import { PlusCircle, Package } from "lucide-react";
// import { CldUploadWidget, CldImage } from "next-cloudinary";

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   category: string;
//   price: number;
//   stock: number;
//   image: string;
//   seller: string;
//   createdAt: string;
// }

// export default function Listing() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [imageUrl, setImageUrl] = useState("");
//   const [productData, setProductData] = useState({
//     name: "",
//     description: "",
//     category: "",
//     price: 0,
//     stock: 0,
//     image: "",
//     seller: "",
//   });

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch("/api/products");
//       const data = await res.json();
//       setProducts(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setProductData({ ...productData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("/api/products/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...productData,
//           image: imageUrl,
//         }),
//       });

//       if (response.ok) {
//         setProductData({
//           name: "",
//           description: "",
//           category: "",
//           price: 0,
//           stock: 0,
//           image: "",
//           seller: "",
//         });
//         setImageUrl("");
//         setIsFormOpen(false);
//         fetchProducts();
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <div className="flex items-center gap-3">
//             <Package className="h-8 w-8 text-blue-600" />
//             <h1 className="text-3xl font-bold text-gray-900">
//               Product Listing
//             </h1>
//           </div>
//           <button
//             onClick={() => setIsFormOpen(!isFormOpen)}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <PlusCircle className="h-5 w-5" />
//             Add Product
//           </button>
//         </div>

//         {isFormOpen && (
//           <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//             <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-gray-700">
//                   Product Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={productData.name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter product name"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-gray-700">
//                   Category
//                 </label>
//                 <input
//                   type="text"
//                   name="category"
//                   value={productData.category}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter category"
//                 />
//               </div>

//               <div className="space-y-1 md:col-span-2">
//                 <label className="text-sm font-medium text-gray-700">
//                   Description
//                 </label>
//                 <input
//                   type="text"
//                   name="description"
//                   value={productData.description}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter product description"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-gray-700">
//                   Price ($)
//                 </label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={productData.price}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="0.00"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-gray-700">
//                   Stock
//                 </label>
//                 <input
//                   type="number"
//                   name="stock"
//                   value={productData.stock}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="0"
//                 />
//               </div>

//               <div className="space-y-1 md:col-span-2">
//                 <label className="text-sm font-medium text-gray-700">
//                   Product Image
//                 </label>
//                 <div className="mt-1 flex flex-col items-center gap-4 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                   {imageUrl && (
//                     <CldImage
//                       width="300"
//                       height="180"
//                       src={imageUrl}
//                       alt="Product preview"
//                       className="rounded-md"
//                     />
//                   )}
//                   <CldUploadWidget
//                     uploadPreset="pvknlh5s"
//                     onSuccess={(result: any) => {
//                       if (result.info?.public_id) {
//                         setImageUrl(result.info.public_id);
//                         setProductData(prev => ({
//                           ...prev,
//                           image: result.info.public_id
//                         }));
//                       }
//                     }}
//                   >
//                     {({ open }) => (
//                       <button
//                         type="button"
//                         className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
//                         onClick={() => open()}
//                       >
//                         Upload Image
//                       </button>
//                     )}
//                   </CldUploadWidget>
//                 </div>
//               </div>

//               <div className="space-y-1 md:col-span-2">
//                 <label className="text-sm font-medium text-gray-700">
//                   Seller
//                 </label>
//                 <input
//                   type="text"
//                   name="seller"
//                   value={productData.seller}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter seller name"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="md:col-span-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Submit Product
//               </button>
//             </form>
//           </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
//             >
//               <div className="relative h-48">
//                 {product.image && (
//                   <CldImage
//                     src={product.image}
//                     alt={product.name}
//                     fill
//                     className="object-cover"
//                   />
//                 )}
//                 <div className="absolute top-2 right-2">
//                   <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
//                     {product.category}
//                   </span>
//                 </div>
//               </div>

//               <div className="p-4">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                   {product.name}
//                 </h2>
//                 <p className="text-gray-600 text-sm mb-3">
//                   {product.description}
//                 </p>

//                 <div className="flex justify-between items-center mb-3">
//                   <span className="text-2xl font-bold text-gray-900">
//                     ${product.price.toFixed(2)}
//                   </span>
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-medium
//                     ${
//                       product.stock > 10
//                         ? "bg-green-100 text-green-800"
//                         : product.stock > 0
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {product.stock > 0
//                       ? `${product.stock} in stock`
//                       : "Out of stock"}
//                   </span>
//                 </div>

//                 <div className="flex items-center text-gray-500 text-sm">
//                   <span>Seller: {product.seller}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { PlusCircle, Package } from "lucide-react";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import type { Product } from "@prisma/client";

// Define the Category enum
export enum Category {
  Electronics = "Electronics",
  Fashion = "Fashion",
  Furniture = "Furniture",
  Accessories = "Accessories",
  Sports = "Sports",
  Others = "Others",
}

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   category: string;
//   price: number;
//   stock: number;
//   images: string[];
//   seller: string;
//   createdAt: string;
// }

export default function Listing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imagePublicId, setImagePublicId] = useState(""); // State for storing public ID
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
    seller: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("category", productData.category);
    formData.append("price", productData.price.toString());
    formData.append("stock", productData.stock.toString());
    formData.append("seller", productData.seller);
    formData.append("image", imagePublicId); 
    formData.append("url", imageUrl); 

    try {
      const response = await fetch("/api/products/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setProductData({
          name: "",
          description: "",
          category: "",
          price: 0,
          stock: 0,
          seller: "",
        });
        setImageUrl("");
        setImagePublicId(""); // Reset the public ID
        setIsFormOpen(false);
        fetchProducts();
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Product Listing</h1>
          </div>
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            Add Product
          </button>
        </div>

        {isFormOpen && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product name"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={productData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a category</option>
                  {Object.values(Category).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product description"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={productData.stock}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Product Image</label>
                <div className="mt-1 flex flex-col items-center gap-4 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  {imageUrl && (
                    <CldImage
                      width="300"
                      height="180"
                      src={imageUrl} 
                      alt="Product preview"
                      className="rounded-md"
                    />
                  )}
                  <CldUploadWidget
                    uploadPreset="pvknlh5s"
                    onSuccess={(result: any) => {
                      console.log(result);
                      if (result.info) {
                        setImageUrl(result.info.secure_url);
                        setImagePublicId(result.info.public_id); // Store the public_id
                      }
                    }}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        onClick={() => open()}
                      >
                        Upload Image
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Seller</label>
                <input
                  type="text"
                  name="seller"
                  value={productData.seller}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter seller name"
                />
              </div>

              <button
                type="submit"
                className="md:col-span-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Product
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            return ((
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  {product.images && (
                    <CldImage
                      src={product.images[0]} // This should be the public_id
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute top-2 right-2 test">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
  
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3">
                    {product.description}
                  </p>
  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-bold text-gray-800">${product.price}</span>
                    <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                  </div>
                  <p className="text-sm text-gray-500">Seller: {product.seller}</p>
                </div>
              </div>
            ))

          })}
        </div>
      </div>
    </div>
  );
}
