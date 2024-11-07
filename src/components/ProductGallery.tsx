// components/ProductGallery.tsx
"use client";

import Image from "next/image";
import React, { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
}) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-white rounded-lg shadow">
        <div className="aspect-square overflow-hidden rounded-lg">
          <Image
            src={selectedImage}
            alt={`${productName} - Main Image`}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`aspect-square overflow-hidden rounded-md border-2 cursor-pointer transition
                ${
                  selectedImage === image
                    ? "border-blue-500"
                    : "border-transparent hover:border-blue-500"
                }`}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="object-cover w-full h-full hover:opacity-80 transition"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
