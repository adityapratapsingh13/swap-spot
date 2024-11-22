"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { CldImage } from "next-cloudinary";
import { Search } from "lucide-react";

// Add a debug function
const debug = (message: string, data?: unknown) => {
  console.log(`[DEBUG] ${message}`, data);
};

export default function ListProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    debug("Component mounted");
    fetchProducts();
  }, []);

  useEffect(() => {
    debug("Query or products changed", {
      query,
      productsCount: products.length,
    });
    if (query) {
      const lowerQuery = query.toLowerCase();
      setFilteredProducts(
        products.filter(
          (product) =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery) ||
            product.category.toLowerCase().includes(lowerQuery)
        )
      );
    } else {
      setFilteredProducts(products);
    }
    debug("Filtered products updated", {
      filteredCount: filteredProducts.length,
    });
  }, [query, products, filteredProducts]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      debug("Fetching products");
      const res = await fetch("/api/products");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      debug("Products fetched successfully", { count: data.length });
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Add a user-friendly error message
      setProducts([]);
      setFilteredProducts([]);
    }
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    debug("Search submitted", { query });
  };

  debug("Rendering component", {
    productsCount: products.length,
    filteredCount: filteredProducts.length,
    loading,
    isSearchExpanded,
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Product List</h1>
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <section id="middle">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">
            Product List
          </h1>
          <div
            className={`transition-all duration-300 ease-in-out transform mr-6 ${
              isSearchExpanded ? "w-80 scale-105" : "w-48"
            }`}
          >
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                className="w-full bg-gray-100 text-black rounded-full py-2 pl-10 pr-4 ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder={
                  isSearchExpanded ? "Search for items..." : "Search..."
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsSearchExpanded(true)}
                autoFocus={isSearchExpanded}
                onBlur={() => setIsSearchExpanded(false)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl text-gray-600">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <CldImage
                        src={product.images[0]}
                        alt={product.name}
                        width={400}
                        height={192}
                        className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">
                          No image available
                        </span>
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
                      Added on:{" "}
                      {new Date(product.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
