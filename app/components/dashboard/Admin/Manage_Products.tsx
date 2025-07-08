import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/app/utils/types/app";
import { getTokenClient } from "@/app/utils/api/getTokenClient";
import API_BASE_URL from "@/app/utils/api/base";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";

type UpdateProduct = {
  productId: number;
  productName: string;
  description: string;
  price: number;
  availability: string;
  categoryName?: string;
  images: string[];
  imagesFiles?: File[];
};

const Manage_Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductDesc, setNewProductDesc] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newAvailability, setNewAvailability] = useState("Sale");
  const [newPrice, setNewPrice] = useState("");
  const [newImages, setNewImages] = useState<File[]>([]);
  const [editProduct, setEditProduct] = useState<UpdateProduct | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const token = getTokenClient();

  // Use useCallback to avoid creating this function on every render
  const openEditDialog = useCallback((product: Product) => {
    setEditProduct(product);
    setIsEditDialogOpen(true);
  }, []);

  // Move dialog control to separate useCallback functions
  const openDeleteDialog = useCallback((product: Product) => {
    setEditProduct(product);
    setIsDeleteDialogOpen(true);
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${API_BASE_URL}/Product/ProductsList`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.succeeded) {
          setProducts(response.data.data);
          // Calculate total pages
          setTotalPages(Math.ceil(response.data.data.length / itemsPerPage));
        } else {
          throw new Error(response.data.message || "Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [token, itemsPerPage]);

  // Get paginated products
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages(Array.from(e.target.files));
    }
  };

  const handleAddProduct = async () => {
    if (!newProductName || !newProductDesc || !newCategoryName || !newPrice) {
      console.log("Missing required fields");
      return;
    }
    if (!token) {
      console.log("No token available");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("Name", newProductName.trim());
      formData.append("Description", newProductDesc.trim());
      formData.append("CategoryName", newCategoryName.trim());
      formData.append("Price", newPrice.trim());
      formData.append("Availability", newAvailability.trim());
      newImages.forEach((image) => {
        formData.append("Images", image);
      });
      const response = await axios.post(`${API_BASE_URL}/Product/Product/Create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response", response);
      setProducts([...products, response.data]);
      setNewProductName("");
      setNewProductDesc("");
      setNewCategoryName("");
      setNewPrice("");
      setNewAvailability("Sale");
      setNewImages([]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!token) {
      return;
    }
    try {
      await axios.delete(`${API_BASE_URL}/Product/ProductDelete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter((prod) => prod.productId !== id));
      console.log("Product deleted");
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };
  const handleEditProduct = async () => {
    if (!editProduct || !editProduct.productName.trim()) {
      return;
    }
    if (!token) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("Id", editProduct.productId.toString());
      formData.append("Name", editProduct.productName.trim());
      formData.append("Description", editProduct.description.trim());
      formData.append("CategoryName", editProduct.categoryName?.trim() || "");
      formData.append("Price", editProduct.price.toString());
      formData.append("Availability", editProduct.availability || "Sale");

      if (editProduct.imagesFiles && editProduct.imagesFiles.length > 0) {
        editProduct.imagesFiles.forEach((image: File) => {
          formData.append("Images", image);
        });
      } else if (editProduct.images && editProduct.images.length > 0) {
        editProduct.images.forEach((image: string) => {
          formData.append("Images", image);
        });
      }

      await axios.put(`${API_BASE_URL}/Product/Product/Update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setProducts(
        products.map((prod) =>
          prod.productId === editProduct.productId
            ? {
                productId: editProduct.productId,
                productName: editProduct.productName,
                description: editProduct.description,
                price: editProduct.price,
                availability: editProduct.availability,
                categoryName: editProduct.categoryName,
                images: editProduct.imagesFiles ? editProduct.imagesFiles.map((file) => URL.createObjectURL(file)) : editProduct.images || [],
                averageRating: prod.averageRating, // preserve the existing rating
                isFavorite: prod.isFavorite, // preserve the favorite status
                productOwner: prod.productOwner, // preserve the product owner
              }
            : prod
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsEditDialogOpen(false);
      setEditProduct(null);
    }
  };

  // Helper function to safely format prices
  const formatPrice = (price: number | undefined | null): string => {
    // Check if price exists and is a valid number
    if (price !== undefined && price !== null && !isNaN(price)) {
      return price.toFixed(2);
    }
    return "0.00"; // Default price when invalid
  };

  // Helper function to get the first image URL or return null
  const getFirstImageUrl = (product: Product): string | null => {
    if (product.images && product.images.length > 0 && product.images[0]) {
      return product.images[0];
    }
    return null;
  };

  // Navigation functions
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Add Product Form */}
      <div className="bg-white rounded-lg shadow-sm p-3 md:p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div className="space-y-3">
            <div>
              <Label className="text-sm">Product name</Label>
              <Input placeholder="Product name" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} className="w-full text-sm" />
            </div>
            <div>
              <Label className="text-sm">Product description</Label>
              <Input placeholder="Product description" value={newProductDesc} onChange={(e) => setNewProductDesc(e.target.value)} className="w-full text-sm" />
            </div>
            <div>
              <Label className="text-sm">Category name</Label>
              <Input placeholder="Category name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="w-full text-sm" />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <Label className="text-sm">Price</Label>
              <Input placeholder="Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} type="number" className="w-full text-sm" />
            </div>
            <div>
              <Label className="text-sm">Availability</Label>
              <Select value={newAvailability} onValueChange={(value) => setNewAvailability(value)}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sale">Sale</SelectItem>
                  <SelectItem value="Lease">Lease</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">Images</Label>
              <Input type="file" multiple onChange={handleImageChange} className="w-full text-sm" />
            </div>
          </div>
        </div>
        <Button onClick={handleAddProduct} className="bg-green text-white w-full mt-4 text-sm md:text-base">
          Add Product
        </Button>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-3 md:p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Products ({products.length})</h3>
          <div className="flex items-center space-x-2">
            <Label className="text-sm">Items per page:</Label>
            <Select value={itemsPerPage.toString()} onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1); // Reset to first page when changing items per page
            }}>
              <SelectTrigger className="w-16 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="divide-y">
          {products.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No products found</p>
            </div>
          ) : (
            paginatedProducts.map((product) => (
              <div key={product.productId} className="p-3 md:p-4">
                {/* Mobile Layout */}
                <div className="block md:hidden space-y-3">
                  <div className="flex items-start gap-3">
                    {/* Product Image */}
                    <div className="w-16 h-16 rounded-md overflow-hidden relative bg-gray-100 flex-shrink-0">
                      {getFirstImageUrl(product) ? (
                        <Image 
                          src={getFirstImageUrl(product)!} 
                          alt={product.productName} 
                          fill 
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <ImageOff size={20} />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-base">{product.productName}</h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <p className="font-medium">{product.categoryName || "Uncategorized"}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Price:</span>
                      <p className="font-medium text-green">EG {formatPrice(product.price)}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => openEditDialog(product)}>
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" className="flex-1 text-xs" onClick={() => openDeleteDialog(product)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Product Image */}
                    <div className="w-16 h-16 rounded-md overflow-hidden relative bg-gray-100 flex-shrink-0">
                      {getFirstImageUrl(product) ? (
                        <Image 
                          src={getFirstImageUrl(product)!} 
                          alt={product.productName} 
                          fill 
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <ImageOff size={20} />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-base truncate">{product.productName}</h4>
                      <p className="text-sm text-gray-600 truncate">{product.description}</p>
                      <div className="flex gap-4 text-sm text-gray-500 mt-1">
                        <span>Category: {product.categoryName || "Uncategorized"}</span>
                        <span>Price: EG {formatPrice(product.price)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(product)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(product)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Pagination Controls */}
        {products.length > 0 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, products.length)} of {products.length} products
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={goToPrevPage} 
                disabled={currentPage === 1}
                className="h-8 w-8 p-0 flex items-center justify-center"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="text-sm">
                Page {currentPage} of {totalPages}
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={goToNextPage} 
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0 flex items-center justify-center"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">Edit Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="w-full text-start">
              <Label>Product name</Label>
              <Input
                value={editProduct?.productName || ""}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    productName: e.target.value,
                  } as UpdateProduct)
                }
                placeholder="Edit product name"
              />
            </div>
            <div className="w-full text-start">
              <Label>Product description</Label>
              <Input
                value={editProduct?.description || ""}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                  } as UpdateProduct)
                }
                placeholder="Edit product description"
              />
            </div>
            <div className="w-full text-start">
              <Label>Category name</Label>
              <Input
                value={editProduct?.categoryName || ""}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    categoryName: e.target.value,
                  } as UpdateProduct)
                }
                placeholder="Edit category name"
              />
            </div>
            <div className="w-full text-start">
              <Label>Price</Label>
              <Input
                value={editProduct?.price.toString() || ""}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    price: parseFloat(e.target.value) || 0,
                  } as UpdateProduct)
                }
                type="number"
                placeholder="Edit price"
              />
            </div>
            <div className="w-full text-start">
              <Label>Availability</Label>
              <Select
                value={editProduct?.availability || "Sale"}
                onValueChange={(value) =>
                  setEditProduct({
                    ...editProduct,
                    availability: value,
                  } as UpdateProduct)
                }>
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sale">Sale</SelectItem>
                  <SelectItem value="Lease">Lease</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full text-start">
              <Label>Images</Label>
              <Input
                type="file"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    const filesArray = Array.from(e.target.files);
                    setEditProduct({
                      ...editProduct,
                      imagesFiles: filesArray,
                      images: filesArray.map((file) => URL.createObjectURL(file)),
                    } as UpdateProduct);
                  }
                }}
                className="w-full"
              />
              {editProduct?.images && editProduct.images.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-[#4b5563]">Current Images:</p>
                  {editProduct.images.map((image, index) => (
                    <span key={index} className="block text-sm text-[#4b5563]">
                      {image}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button onClick={handleEditProduct} className="bg-green text-[#ffffff]">
              Save
            </Button>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="text-[#1f2937] border-[#e5e7eb]">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete &quot;{editProduct?.productName}&quot;?</p>
          <DialogFooter>
            <Button onClick={() => editProduct && handleDeleteProduct(editProduct.productId)} className="bg-[#ef4444] text-[#ffffff]">
              Delete
            </Button>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="text-[#1f2937] border-[#e5e7eb]">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Manage_Products;
