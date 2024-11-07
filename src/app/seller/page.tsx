"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  PlusCircle,
  Save,
  X,
  Camera,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/seller/Produt_detail";

interface Product {
  name: string;
  category: string;
  brand?: string;
  description: string;
  images: string[];
  price: number;
  discountPercentage?: number;
  stock: number;
  sku?: string;
  condition?: string;
  expirationDate?: string;
}

interface Category {
  value: string;
  label: string;
}

interface Condition {
  value: string;
  label: string;
}

const categories: Category[] = [
  { value: "electronics", label: "Electronics" },
  { value: "furniture", label: "Furniture" },
];

const conditions: Condition[] = [
  { value: "new", label: "New" },
  { value: "used", label: "Used" },
];

const ProductForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Product>({
    name: "",
    category: "",
    brand: "",
    description: "",
    images: [],
    price: 0,
    discountPercentage: undefined,
    stock: 0,
    sku: "",
    condition: "",
    expirationDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log(formData);
      setFormData({
        name: "",
        category: "",
        brand: "",
        description: "",
        images: [],
        price: 0,
        discountPercentage: undefined,
        stock: 0,
        sku: "",
        condition: "",
        expirationDate: "",
      });
    } catch (err) {
      setError("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-100 to-slate-200">
      <header className="bg-white border-b border-indigo-100 sticky top-0 z-50 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-indigo-600 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back to Products</span>
            </button>
            <div className="flex space-x-4">
              <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-300">
                Save as Draft
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 transition-all duration-300 flex items-center disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Publishing..." : "Publish Product"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {/* Left Column - Images */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6 transition-all duration-300 hover:shadow-md">
              <h3 className="text-lg font-semibold text-gray-900">
                Product Images
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative aspect-square group">
                    <Image
                      src={image}
                      alt={`Product image ${index + 1}`}
                      fill
                      className="object-cover rounded-xl transition-all duration-300 group-hover:brightness-90"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = formData.images.filter(
                          (_, i) => i !== index
                        );
                        setFormData({
                          ...formData,
                          images: newImages,
                        });
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-indigo-200 rounded-xl hover:border-indigo-400 cursor-pointer transition-all duration-300 bg-indigo-50/50 hover:bg-indigo-50">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Camera className="w-8 h-8 text-indigo-400" />
                  <span className="mt-2 text-sm text-indigo-600 font-medium">
                    Add Image
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="md:col-span-2 space-y-8">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Basic Information
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="block w-full rounded-lg text-black border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    required
                    placeholder="Enter product name"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value,
                        })
                      }
                      className="block w-full rounded-lg text-black border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand
                    </label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          brand: e.target.value,
                        })
                      }
                      className="block w-full rounded-lg text-black border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                      placeholder="Enter brand name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    className="block w-full rounded-lg text-black border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    required
                    placeholder="Enter product description"
                  />
                </div>
              </div>
            </div>

            {/* Pricing and Inventory */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Pricing & Inventory
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <div className="relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: Number(e.target.value),
                        })
                      }
                      className="block w-full text-black pl-7 pr-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                      placeholder="0.00"
                      required
                      step=""
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount %
                  </label>
                  <input
                    type="number"
                    value={formData.discountPercentage ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discountPercentage: Number(e.target.value),
                      })
                    }
                    className="block w-full rounded-lg text-black border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    min="0"
                    max="100"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock *
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stock: Number(e.target.value),
                      })
                    }
                    className="block w-full rounded-lg text-black border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    required
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Additional Details
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SKU (Stock Keeping Unit)
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sku: e.target.value,
                      })
                    }
                    className="block w-full rounded-lg text-black border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    placeholder="Enter SKU"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Condition
                  </label>
                  <select
                    value={formData.condition}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        condition: e.target.value,
                      })
                    }
                    className="block w-full rounded-lg text-black border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  >
                    <option value="">Select Condition</option>
                    {conditions.map((condition) => (
                      <option key={condition.value} value={condition.value}>
                        {condition.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    value={formData.expirationDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        expirationDate: e.target.value,
                      })
                    }
                    className="block w-full rounded-lg text-black border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProductForm;
