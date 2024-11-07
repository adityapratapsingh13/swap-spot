// // app/products/[id]/page.tsx

// import React from 'react';
// import { Product } from '@/types/product'; // Adjust the import path based on your structure

// // Define a server action that fetches product details
// async function getProductById(id: string): Promise<Product | null> {
//   const response = await fetch(`http://localhost:3000/api/products/${id}`);
//   if (!response.ok) {
//     return null; // Handle not found or error
//   }
//   const product: Product = await response.json();
//   return product;
// }

// // Component for rendering product details
// const Page = async ({ params }: { params: { id: string } }) => {
//   const { id } = await params;
//   const product = await getProductById(id);

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <div>
//       <h1>{product.name}</h1>
//       <p>{product.description}</p>
//       <div>
//         {product.images.map((image, index) => (
//           <img key={index} src={image} alt={`Product image ${index + 1}`} />
//         ))}
//       </div>
//       <p>Price: ${product.price.toFixed(2)}</p>
//       <p>Seller: {product.seller}</p>
//       <p>Stock: {product.stock} available</p>
//       <p>Ratings: {product.ratings}</p>
//     </div>
//   );
// };

"use client"; // This is a client component
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Import NextAuth session hook
import { Product } from "@/types/product";
import { ProductGallery } from "@/components/ProductGallery";
import ChatButton from "@/components/ChatButton"; // Make sure the path is correct

async function getProductById(id: string): Promise<Product | null> {
  const response = await fetch(`http://localhost:3000/api/products/${id}`);
  if (!response.ok) {
    return null;
  }
  const product: Product = await response.json();
  return product;
}

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const { data: session } = useSession();

  const userId = session?.user?.id;

  useEffect(() => {
    async function fetchProduct() {
      const fetchedProduct = await getProductById(id);
      setProduct(fetchedProduct);
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Image Gallery */}
        <ProductGallery images={product.images} productName={product.name} />

        {/* Right Column - Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-sm font-medium">
                  {product.ratings}
                </span>
              </div>
              <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
                In Stock: {product.stock}
              </span>
            </div>
            <p className="text-4xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="space-y-4">
            {/* Description Card */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Seller Info */}
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Seller: {product.seller}</span>
            </div>

            {/* Stock Info */}
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <span>{product.stock} units available</span>
            </div>
          </div>

          {/* Chat with Seller Button */}
          <div className="pt-6">
            {userId ? (
              <ChatButton
                sellerName={product.seller}
                chatId={product.id}
                userId={userId}
              />
            ) : (
              <p className="text-red-500">
                You need to be logged in to chat with the seller.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
