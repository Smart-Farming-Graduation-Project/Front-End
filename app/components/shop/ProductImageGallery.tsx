"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, productName }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // If no images, show placeholder
  if (!images || images.length === 0) {
    return (
      <div className="w-full">
        <div className="main-image-container bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center h-[400px] md:h-[500px]">
          <div className="text-center text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>No image available</p>
          </div>
        </div>
      </div>
    );
  }

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageSelect = (index: number) => {
    if (index !== selectedImageIndex) {
      setIsLoading(true);
      setSelectedImageIndex(index);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Main Image Display */}
      <div className="main-image-container relative bg-gray-50 rounded-lg overflow-hidden group">
        <div className="relative w-full h-[400px] md:h-[500px]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green"></div>
            </div>
          )}

          <Image
            src={images[selectedImageIndex]}
            alt={`${productName} - Image ${selectedImageIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "contain" }}
            className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
            onLoad={handleImageLoad}
            priority={selectedImageIndex === 0}
          />

          {/* Navigation Arrows - Only show if more than 1 image */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                aria-label="Previous image">
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                aria-label="Next image">
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {selectedImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Gallery - Netflix style */}
      {images.length > 1 && (
        <div className="thumbnail-gallery">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleImageSelect(index)}
                className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 ${
                  selectedImageIndex === index ? "ring-2 ring-green ring-offset-2 shadow-lg" : "ring-1 ring-gray-200 hover:ring-gray-300"
                }`}
                aria-label={`View image ${index + 1}`}>
                <Image
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  sizes="80px"
                  style={{ objectFit: "cover" }}
                  className={`transition-opacity duration-200 ${selectedImageIndex === index ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
                />

                {/* Selected indicator */}
                {selectedImageIndex === index && (
                  <div className="absolute inset-0 bg-green bg-opacity-10 flex items-center justify-center">
                    <div className="w-3 h-3 bg-green rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Image Information */}
      <div className="text-center text-sm text-gray-500">{images.length > 1 && <p>Click thumbnails to view different angles • Use arrow keys to navigate</p>}</div>
    </div>
  );
};

export default ProductImageGallery;
