import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/app/utils/types/app";
import { getTokenClient } from "@/app/utils/api/getTokenClient";
import API_BASE_URL from "@/app/utils/api/base";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Manage_Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductDesc, setNewProductDesc] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newAvailability, setNewAvailability] = useState("Sale");
  const [newPrice, setNewPrice] = useState("");
  const [newImages, setNewImages] = useState<File[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = getTokenClient();

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
  }, [token]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages(Array.from(e.target.files));
    }
  };
  // Add Product
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
  // Delete Product
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
      editProduct.images.forEach((image) => {
        formData.append("Images", image);
      });
      await axios.put(`${API_BASE_URL}/Product/Product/Update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const response = await axios.get(`${API_BASE_URL}/Product/ProductsList`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.succeeded) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsEditDialogOpen(false);
      setEditProduct(null);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-2 mb-4">
        <div className="w-full text-start mb-2">
          <Label>Product name</Label>
          <Input placeholder="Product name" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} required className="w-full" />
        </div>
        <div className="w-full text-start mb-2">
          <Label>Product description</Label>
          <Input placeholder="Product description" value={newProductDesc} onChange={(e) => setNewProductDesc(e.target.value)} required className="w-full" />
        </div>
        <div className="w-full text-start mb-2">
          <Label>Category name</Label>
          <Input placeholder="Category name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} required className="w-full" />
        </div>
        <div className="w-full text-start mb-2">
          <Label>Price</Label>
          <Input placeholder="Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} type="number" required className="w-full" />
        </div>
        <div className="w-full text-start mb-2">
          <Label>Availability</Label>
          <Select value={newAvailability} onValueChange={(value) => setNewAvailability(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sale">Sale</SelectItem>
              <SelectItem value="Lease">Lease</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full text-start mb-2">
          <Label>Images</Label>
          <Input type="file" multiple onChange={handleImageChange} className="w-full" />
        </div>
        <Button onClick={handleAddProduct} className="bg-green text-[#ffffff] w-full">
          Add Product
        </Button>
      </div>
      <ul className="space-y-2">
        {loading && <p>Loading...</p>}
        {products.map((product) => (
          <li key={product.productId} className="flex flex-col md:flex-row items-center justify-between p-2 bg-[#f3f4f6] rounded-md">
            <div className="text-start">
              <span className="font-medium">{product.productName}</span>
              <span className="block text-sm text-[#4b5563]">{product.description}</span>
              <span className="block text-sm text-[#4b5563]">Category: {product.categoryName}</span>
              <span className="block text-sm text-[#4b5563]">Price: EG{product.price}</span>
              <span className="block text-sm text-[#4b5563]">Images: {product.images && product.images.length > 0 ? product.images[0] : "No images"}</span>
            </div>
            <div className="flex gap-2">
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="text-[#1f2937] border-[#e5e7eb] hover:bg-[#e5e7eb]" onClick={() => setEditProduct(product)}>
                    Edit
                  </Button>
                </DialogTrigger>
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
                          } as Product)
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
                          } as Product)
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
                          } as Product)
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
                          } as Product)
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
                          } as Product)
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
                            } as Product);
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
              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="bg-[#ef4444] text-[#ffffff] hover:bg-[#dc2626]">
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Product</DialogTitle>
                  </DialogHeader>
                  <p>Are you sure you want to delete &quot;{product.productName}&quot;?</p>
                  <DialogFooter>
                    <Button onClick={() => handleDeleteProduct(product.productId)} className="bg-[#ef4444] text-[#ffffff]">
                      Delete
                    </Button>
                    <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="text-[#1f2937] border-[#e5e7eb]">
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Manage_Products;
