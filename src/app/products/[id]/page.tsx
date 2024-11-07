// // // app/products/[id]/page.tsx

// // import React from 'react';
// // import { Product } from '@/types/product'; // Adjust the import path based on your structure

// // // Define a server action that fetches product details
// // async function getProductById(id: string): Promise<Product | null> {
// //   const response = await fetch(`http://localhost:3000/api/products/${id}`);
// //   if (!response.ok) {
// //     return null; // Handle not found or error
// //   }
// //   const product: Product = await response.json();
// //   return product;
// // }

// // // Component for rendering product details
// // const Page = async ({ params }: { params: { id: string } }) => {
// //   const { id } = await params;
// //   const product = await getProductById(id);

// //   if (!product) {
// //     return <div>Product not found</div>;
// //   }

// //   return (
// //     <div>
// //       <h1>{product.name}</h1>
// //       <p>{product.description}</p>
// //       <div>
// //         {product.images.map((image, index) => (
// //           <img key={index} src={image} alt={`Product image ${index + 1}`} />
// //         ))}
// //       </div>
// //       <p>Price: ${product.price.toFixed(2)}</p>
// //       <p>Seller: {product.seller}</p>
// //       <p>Stock: {product.stock} available</p>
// //       <p>Ratings: {product.ratings}</p>
// //     </div>
// //   );
// // };

// "use client"; // This is a client component

// import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react"; // Import NextAuth session hook
// import { Product } from "@/types/product";
// import { ProductGallery } from "@/components/ProductGallery";
// import ChatButton from "@/components/ChatButton"; // Make sure the path is correct

// async function getProductById(id: string): Promise<Product | null> {
//   const response = await fetch(`http://localhost:3000/api/products/${id}`);
//   if (!response.ok) {
//     return null;
//   }
//   const product: Product = await response.json();
//   return product;
// }

// const Page = ({ params }: { params: { id: string } }) => {
//   const { id } = params;
//   const [product, setProduct] = useState<Product | null>(null);
//   const [userId, setUserId] = useState<string | null>(null);
//   const { data: session, status } = useSession();

//   useEffect(() => {
//     async function fetchProduct() {
//       const fetchedProduct = await getProductById(id);
//       setProduct(fetchedProduct);
//     }
//     fetchProduct();

//     if (status === "loading") return;
//     if (status === "authenticated" && session && session.user) {
//       setUserId(session.user.id);
//     }
//   }, [id, session, status]);

//   if (!product) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <p className="text-lg text-gray-500">Product not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid md:grid-cols-2 gap-8">
//         {/* Left Column - Image Gallery */}
//         <ProductGallery images={product.images} productName={product.name} />

//         {/* Right Column - Product Details */}
//         <div className="space-y-6">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
//             <div className="flex items-center gap-2 mb-4">
//               <div className="flex items-center">
//                 <svg
//                   className="w-5 h-5 text-yellow-400 fill-current"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//                 <span className="ml-1 text-sm font-medium">
//                   {product.ratings}
//                 </span>
//               </div>
//               <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
//                 In Stock: {product.stock}
//               </span>
//             </div>
//             <p className="text-4xl font-bold text-blue-600">
//               ₹{product.price.toFixed(2)}
//             </p>
//           </div>

//           <div className="space-y-4">
//             {/* Description Card */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <p className="text-gray-700 leading-relaxed">
//                 {product.description}
//               </p>
//             </div>

//             {/* Seller Info */}
//             <div className="flex items-center gap-2 text-gray-600">
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                 />
//               </svg>
//               <span>Seller: {product.seller}</span>
//             </div>

//             {/* Stock Info */}
//             <div className="flex items-center gap-2 text-gray-600">
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
//                 />
//               </svg>
//               <span>{product.stock} units available</span>
//             </div>
//           </div>

//           {/* Chat with Seller Button */}
//           <div className="pt-6">
//             {userId ? (
//               <ChatButton
//                 sellerName={product.seller}
//                 chatId={product.id}
//                 userId={userId}
//               />
//             ) : (
//               <p className="text-red-500">
//                 You need to be logged in to chat with the seller.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MessageCircle,
  Package,
  User,
  X,
} from "lucide-react";

import { ProductGallery } from "@/components/ProductGallery";
import Navbar from "@/app/Navbar/page";
import Chat from "@/components/ChatBox/Chat";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  ratings: number;
  stock: number;
  seller: string;
  images: string[];
}

async function getProductById(id: string): Promise<Product | null> {
  const response = await fetch(`http://localhost:3000/api/products/${id}`);
  if (!response.ok) {
    return null;
  }
  const product: Product = await response.json();
  return product;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [showChat, setShowChat] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    async function fetchProduct() {
      const fetchedProduct = await getProductById(id);
      setProduct(fetchedProduct);
    }
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-500">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductGallery
              images={product.images}
              productName={product.name}
            />
          </motion.div>

          {/* Right column */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-8">
                <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  {product.name}
                </h1>
                <div className="mt-3 flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <Star
                        key={rating}
                        className={`${
                          product.ratings > rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } h-5 w-5 flex-shrink-0`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="ml-2 text-sm text-gray-500">
                    {product.ratings} out of 5 stars
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <p className="text-4xl font-bold text-indigo-600">
                    ₹{product.price.toFixed(2)}
                  </p>
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    In Stock
                  </span>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">
                    Description
                  </h3>
                  <div className="mt-2 prose prose-sm text-gray-500">
                    <p>{product.description}</p>
                  </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-8">
                  <div className="flex items-center justify-between text-sm font-medium text-gray-900">
                    <div className="flex items-center">
                      <Package className="flex-shrink-0 mr-2 h-5 w-5 text-gray-400" />
                      <span>{product.stock} available</span>
                    </div>
                    <div className="flex items-center">
                      <User className="flex-shrink-0 mr-2 h-5 w-5 text-gray-400" />
                      <span>Sold by {product.seller}</span>
                    </div>
                  </div>
                </div>

                {status === "authenticated" && session?.user ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowChat(!showChat)}
                    className="mt-4 w-full bg-white border-2 border-indigo-600 rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Chat with Seller
                  </motion.button>
                ) : (
                  <p className="mt-4 text-center text-red-500">
                    You need to be logged in to chat with the seller.
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Chat overlay */}
      <AnimatePresence>
        {showChat && status === "authenticated" && session?.user && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 right-0 w-full sm:w-96 h-[600px] bg-white shadow-lg rounded-t-lg overflow-hidden"
          >
            <div className="flex justify-between items-center bg-indigo-600 text-white p-4">
              <h2 className="text-xl font-semibold">
                Chat with {product.seller}
              </h2>
              <button
                onClick={() => setShowChat(false)}
                className="text-white hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="h-[calc(100%-64px)]">
              <Chat
                chatId={product.id}
                userId={session.user.id}
                sellerName={product.seller}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
