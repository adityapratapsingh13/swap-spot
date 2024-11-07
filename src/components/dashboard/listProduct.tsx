// "use client";
// import { useEffect, useState } from "react";
// import { Product } from "@/types/product";
// import { CldImage } from "next-cloudinary";

// export default function ListProduct() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/products");
//       const data = await res.json();
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//     setLoading(false);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8 text-gray-800">Product List</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products?.map((product) => (
//           <div
//             key={product.id}
//             className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
//           >
//             <div className="relative h-48 overflow-hidden">
//               {product.images ? (
//                 <CldImage
//                   src={product.images[0]}
//                   alt={product.name}
//                   width={400}
//                   height={192}
//                   className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center bg-gray-100">
//                   <span className="text-gray-400">No image available</span>
//                 </div>
//               )}
//             </div>

//             <div className="p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
//                   {product.name}
//                 </h2>
//                 <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
//                   {product.category}
//                 </span>
//               </div>

//               <p className="text-gray-600 mb-4 line-clamp-2">
//                 {product.description}
//               </p>

//               <div className="flex justify-between items-center mb-4">
//                 <span className="text-2xl font-bold text-gray-900">
//                   ${product.price.toFixed(2)}
//                 </span>
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm font-medium
//                   ${
//                     product.stock > 10
//                       ? "bg-green-100 text-green-800"
//                       : product.stock > 0
//                       ? "bg-yellow-100 text-yellow-800"
//                       : "bg-red-100 text-red-800"
//                   }`}
//                 >
//                   {product.stock > 0
//                     ? `${product.stock} in stock`
//                     : "Out of stock"}
//                 </span>
//               </div>

//               <div className="text-sm text-gray-500">
//                 Added on: {new Date(product.createdAt).toLocaleDateString()}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { CldImage } from "next-cloudinary";

export default function ListProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Product List</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                {product.images ? (
                  <CldImage
                    src={product.images[0]}
                    alt={product.name}
                    width={400}
                    height={192}
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
                    {product.name}
                  </h2>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {product.category}
                  </span>
                </div>

                {/* <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p> */}

                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                  ₹{product.price.toFixed(2)}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      product.stock > 10
                        ? "bg-green-100 text-green-800"
                        : product.stock > 0
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>

                <div className="text-sm text-gray-500">
                  Added on: {new Date(product.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
