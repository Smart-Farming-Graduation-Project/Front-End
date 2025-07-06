"use client";
import React, { useState, useEffect } from "react";
import { Camera, Bot, Calendar, Eye, Download, ZoomIn, X, ChevronLeft, ChevronRight, Loader2, AlertCircle, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import axios from "axios";
import API_BASE_URL from "../../utils/api/base";
import { getTokenClient } from "../../utils/api/getTokenClient";
import toast from "react-hot-toast";

interface RoverPhoto {
  photoUrl: string;
  createdDate: string;
}

interface ApiResponse {
  statusCode: number;
  succeeded: boolean;
  message: string;
  data: RoverPhoto[];
}

const PredictionsPage = () => {
  const [roverPhotos, setRoverPhotos] = useState<RoverPhoto[]>([]);
  const [predictedPhotos, setPredictedPhotos] = useState<RoverPhoto[]>([]);
  const [loading, setLoading] = useState({ rover: false, predicted: false });
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ url: string; type: "rover" | "predicted"; index: number } | null>(null);
  const [activeTab, setActiveTab] = useState("rover");

  const token = getTokenClient();

  const fetchRoverPhotos = async () => {
    setLoading((prev) => ({ ...prev, rover: true }));
    try {
      const response = await axios.get<ApiResponse>(`${API_BASE_URL}/Rover/RoverPhoto`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.succeeded) {
        setRoverPhotos(response.data.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      console.error("Error fetching rover photos:", err);
      setError("Failed to load rover photos");
      toast.error("Failed to load rover photos");
    } finally {
      setLoading((prev) => ({ ...prev, rover: false }));
    }
  };

  const fetchPredictedPhotos = async () => {
    setLoading((prev) => ({ ...prev, predicted: true }));
    try {
      const response = await axios.get<ApiResponse>(`${API_BASE_URL}/Rover/RoverPhotoThatArePredicted`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.succeeded) {
        setPredictedPhotos(response.data.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      console.error("Error fetching predicted photos:", err);
      setError("Failed to load predicted photos");
      toast.error("Failed to load predicted photos");
    } finally {
      setLoading((prev) => ({ ...prev, predicted: false }));
    }
  };

  useEffect(() => {
    if (token) {
      fetchRoverPhotos();
      fetchPredictedPhotos();
    }
  }, [token]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleImageClick = (url: string, type: "rover" | "predicted", index: number) => {
    setSelectedImage({ url, type, index });
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      // First try: Direct download with proper CORS handling
      const response = await fetch(url, {
        mode: "cors",
        credentials: "omit",
        headers: {
          Accept: "image/*",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      toast.success("Image downloaded successfully");
    } catch (err) {
      console.error("Download error:", err);

      // Fallback: Open image in new tab for manual download
      try {
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Image opened in new tab for download");
      } catch (fallbackErr) {
        console.error("Fallback download error:", fallbackErr);
        toast.error("Unable to download image. Please try right-clicking and 'Save image as...'");
      }
    }
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return;

    const photos = selectedImage.type === "rover" ? roverPhotos : predictedPhotos;
    const currentIndex = selectedImage.index;
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    } else {
      newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedImage({
      url: photos[newIndex].photoUrl,
      type: selectedImage.type,
      index: newIndex,
    });
  };

  const ImageGallery = ({ photos, type, isLoading }: { photos: RoverPhoto[]; type: "rover" | "predicted"; isLoading: boolean }) => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
          <p className="text-gray-500">Loading {type} photos...</p>
        </div>
      );
    }

    if (photos.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">{type === "rover" ? <Camera className="w-8 h-8 text-gray-400" /> : <Bot className="w-8 h-8 text-gray-400" />}</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No {type} photos found</h3>
          <p className="text-gray-500 text-center">{type === "rover" ? "No photos have been captured by rovers yet." : "No AI predictions have been generated yet."}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {photos.map((photo, index) => (
          <Card key={`${photo.photoUrl}-${index}`} className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={photo.photoUrl}
                alt={`${type} photo ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                onError={(e) => {
                  // Fallback to placeholder on error
                  e.currentTarget.src = "/api/placeholder/400/400";
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white" onClick={() => handleImageClick(photo.photoUrl, type, index)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white" onClick={() => handleDownload(photo.photoUrl, `${type}-photo-${new Date(photo.createdDate).toISOString().split("T")[0]}-${index + 1}.jpg`)}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{formatDate(photo.createdDate)}</span>
                </div>
                <Badge variant={type === "rover" ? "default" : "secondary"}>{type === "rover" ? "Original" : "AI Predicted"}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crop Predictions</h1>
          <p className="text-gray-600">View and analyze rover captured images and AI-generated predictions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Camera className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{roverPhotos.length}</h3>
                  <p className="text-gray-600">Rover Photos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{predictedPhotos.length}</h3>
                  <p className="text-gray-600">AI Predictions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{roverPhotos.length + predictedPhotos.length}</h3>
                  <p className="text-gray-600">Total Images</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <ZoomIn className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{predictedPhotos.length > 0 ? Math.round((predictedPhotos.length / roverPhotos.length) * 100) : 0}%</h3>
                  <p className="text-gray-600">Prediction Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Image Galleries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Image Gallery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="rover" className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Rover Photos ({roverPhotos.length})
                </TabsTrigger>
                <TabsTrigger value="predicted" className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  AI Predictions ({predictedPhotos.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="rover" className="mt-6">
                <ImageGallery photos={roverPhotos} type="rover" isLoading={loading.rover} />
              </TabsContent>

              <TabsContent value="predicted" className="mt-6">
                <ImageGallery photos={predictedPhotos} type="predicted" isLoading={loading.predicted} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Full Screen Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <Button variant="ghost" size="sm" className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white" onClick={() => setSelectedImage(null)}>
                <X className="w-6 h-6" />
              </Button>

              {/* Navigation Buttons */}
              <Button variant="ghost" size="sm" className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white" onClick={() => navigateImage("prev")}>
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button variant="ghost" size="sm" className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white" onClick={() => navigateImage("next")}>
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Download Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute bottom-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white"
                onClick={() => handleDownload(selectedImage.url, `${selectedImage.type}-photo-${new Date().toISOString().split("T")[0]}-fullsize.jpg`)}>
                <Download className="w-5 h-5 mr-2" />
                Download
              </Button>

              {/* Image */}
              <div className="relative max-w-full max-h-full">
                <Image src={selectedImage.url} alt="Full size preview" width={1200} height={800} className="max-w-full max-h-full object-contain" priority style={{ width: "auto", height: "auto" }} />
              </div>

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 z-10 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white">
                <div className="flex items-center gap-2 mb-1">
                  {selectedImage.type === "rover" ? <Camera className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  <span className="font-medium">{selectedImage.type === "rover" ? "Rover Photo" : "AI Prediction"}</span>
                </div>
                <p className="text-sm opacity-90">
                  Image {selectedImage.index + 1} of {selectedImage.type === "rover" ? roverPhotos.length : predictedPhotos.length}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <div>
                  <h3 className="font-medium text-red-900">Error Loading Images</h3>
                  <p className="text-red-700">{error}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setError(null);
                    fetchRoverPhotos();
                    fetchPredictedPhotos();
                  }}
                  className="ml-auto">
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PredictionsPage;
