// components/ProductGallery.tsx
"use client";

import Image from "next/image";
import React, { useState } from "react";
import bgPlaceholder from "@/assets/bg.png";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
}) => {
  const validImages = images.filter((image) => image.trim().length > 0);
  const [selectedImage, setSelectedImage] = useState<string | typeof bgPlaceholder>(
    validImages[0] ?? bgPlaceholder
  );

  return (
    <div className="space-y-4">
      <div className="relative bg-white rounded-lg shadow">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={selectedImage}
            alt={`${productName} - Main Image`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            onError={() => setSelectedImage(bgPlaceholder)}
          />
        </div>
      </div>

      {validImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {validImages.map((image, index) => (
          <div
            key={index}
            className={`relative aspect-square overflow-hidden rounded-md border-2 cursor-pointer transition
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
              fill
              sizes="25vw"
              className="object-cover hover:opacity-80 transition"
            />
          </div>
          ))}
        </div>
      )}
    </div>
  );
};
