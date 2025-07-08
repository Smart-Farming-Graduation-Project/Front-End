import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryType } from "@/app/utils/types/app";
import { getTokenClient } from "@/app/utils/api/getTokenClient";
import API_BASE_URL from "@/app/utils/api/base";
import Image from "next/image";
import { toast } from "react-hot-toast";

const Manage_Categories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDesc, setNewCategoryDesc] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [editCategory, setEditCategory] = useState<CategoryType | null>(null);
  const [editCategoryImage, setEditCategoryImage] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const newImageInputRef = useRef<HTMLInputElement>(null);
  const editImageInputRef = useRef<HTMLInputElement>(null);

  // Fetch Token
  const token = getTokenClient();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/Category/CategoryList`);
        if (response.data.succeeded) {
          setCategories(response.data.data);
        } else {
          throw new Error(response.data.message || "Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  // Handle new image selection
  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        toast.error("Only JPEG and PNG formats are allowed");
        if (newImageInputRef.current) {
          newImageInputRef.current.value = "";
        }
        return;
      }

      setNewCategoryImage(file);
      setNewImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle edit image selection
  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        toast.error("Only JPEG and PNG formats are allowed");
        if (editImageInputRef.current) {
          editImageInputRef.current.value = "";
        }
        return;
      }

      setEditCategoryImage(file);
      setEditImagePreview(URL.createObjectURL(file));
    }
  };

  // Add Category
  const handleAddCategory = async () => {
    if (!newCategoryName) {
      toast.error("Category name is required");
      return;
    }

    if (!token) {
      toast.error("Authentication required");
      return;
    }

    try {
      const formData = new FormData();
      
      if (newCategoryImage) {
        formData.append("Image", newCategoryImage);
        formData.append("image", newCategoryImage);
        formData.append("categoryImage", newCategoryImage);
        formData.append("file", newCategoryImage);
      }
      
      formData.append("Name", newCategoryName.trim());
      formData.append("Description", newCategoryDesc.trim() || "No description");
      
      const url = `${API_BASE_URL}/Category/Category/Create?Name=${encodeURIComponent(newCategoryName.trim())}&Description=${encodeURIComponent(newCategoryDesc.trim() || "No description")}`;
      
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.succeeded) {
        toast.success("Category added successfully");
        // Refresh categories list
        const categoriesResponse = await axios.get(`${API_BASE_URL}/Category/CategoryList`);
        setCategories(categoriesResponse.data.data);

        // Reset form
        setNewCategoryName("");
        setNewCategoryDesc("");
        setNewCategoryImage(null);
        setNewImagePreview(null);
        if (newImageInputRef.current) newImageInputRef.current.value = "";
      } else {
        toast.error(response.data.message || "Failed to add category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category");
    }
  };

  // Delete Category
  const handleDeleteCategory = async (id: number) => {
    if (!token) {
      toast.error("Authentication required");
      return;
    }

    try {
      const response = await axios.delete(`${API_BASE_URL}/Category/CategoryDelete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.succeeded) {
        setCategories(categories.filter((cat) => cat.categoryId !== id));
        toast.success("Category deleted successfully");
      } else {
        toast.error(response.data.message || "Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  // Edit Category
  const handleEditCategory = async () => {
    if (!editCategory || !editCategory.categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (!token) {
      toast.error("Authentication required");
      return;
    }

    try {
      const formData = new FormData();

      if (editCategoryImage) {
        formData.append("Image", editCategoryImage);
      }

      const url = `${API_BASE_URL}/Category/Category/Update?Id=${editCategory.categoryId}&Name=${encodeURIComponent(editCategory.categoryName.trim())}&Description=${encodeURIComponent(
        editCategory.categoryDescription?.toString().trim() || "No description"
      )}`;

      const response = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.succeeded) {
        toast.success("Category updated successfully");
        // Refresh categories list
        const categoriesResponse = await axios.get(`${API_BASE_URL}/Category/CategoryList`);
        setCategories(categoriesResponse.data.data);
      } else {
        toast.error(response.data.message || "Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
    } finally {
      setIsEditDialogOpen(false);
      setEditCategory(null);
      setEditCategoryImage(null);
      setEditImagePreview(null);
    }
  };

  // Handle opening edit dialog
  const openEditDialog = (category: CategoryType) => {
    setEditCategory(category);
    setEditImagePreview(category.categoryImage || null);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="p-4">
      {/* Add Category Form */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h3 className="text-lg font-medium mb-3">Add New Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category Name *</label>
            <Input placeholder="Enter category name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Input placeholder="Enter description" value={newCategoryDesc} onChange={(e) => setNewCategoryDesc(e.target.value)} />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category Image</label>
          <div className="flex flex-col gap-4">
            <div>
              <Input type="file" ref={newImageInputRef} onChange={handleNewImageChange} accept="image/jpeg,image/jpg,image/png" className="mb-2" />
              <p className="text-xs text-gray-500">Only JPEG and PNG formats are allowed. Max 2MB.</p>
            </div>

            {newImagePreview && (
              <div className="w-28 h-28 rounded-md overflow-hidden relative border border-gray-200">
                <Image src={newImagePreview} alt="Category preview" fill className="object-cover" sizes="100%" />
              </div>
            )}
          </div>
        </div>

        <Button onClick={handleAddCategory} className="bg-green text-white">
          Add Category
        </Button>
      </div>

      {/* All Categories */}
      <h3 className="text-lg font-medium mb-3">All Categories</h3>
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green"></div>
        </div>
      ) : categories.length === 0 ? (
        <p className="text-center p-4 bg-gray-50 rounded-md">No categories found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category.categoryId} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                {category.categoryImage ? (
                  <div className="w-12 h-12 rounded-md overflow-hidden relative">
                    <Image src={category.categoryImage} alt={category.categoryName} fill className="object-cover" sizes="48px" />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                    <span className="text-gray-400 text-xs">No image</span>
                  </div>
                )}
                <div>
                  <h4 className="font-medium">{category.categoryName}</h4>
                  <p className="text-sm text-gray-600 truncate max-w-[200px]">{category.categoryDescription || "No description"}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-3 justify-end">
                <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50" onClick={() => openEditDialog(category)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setEditCategory(category);
                    setIsDeleteDialogOpen(true);
                  }}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Make changes to the category information below.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Category Name *</label>
              <Input
                value={editCategory?.categoryName || ""}
                onChange={(e) =>
                  setEditCategory({
                    ...editCategory!,
                    categoryName: e.target.value,
                  } as CategoryType)
                }
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                value={editCategory?.categoryDescription?.toString() || ""}
                onChange={(e) =>
                  setEditCategory({
                    ...editCategory!,
                    categoryDescription: e.target.value,
                  } as unknown as CategoryType)
                }
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Category Image</label>
              <div className="flex flex-col gap-3">
                {editImagePreview && (
                  <div className="w-full h-40 rounded-md overflow-hidden relative border border-gray-200">
                    <Image src={editImagePreview} alt="Category image" fill className="object-cover" sizes="100%" />
                  </div>
                )}
                <Input type="file" ref={editImageInputRef} onChange={handleEditImageChange} accept="image/jpeg,image/jpg,image/png" />
                <p className="text-xs text-gray-500">Only JPEG and PNG formats are allowed. Max 2MB.</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green text-white" onClick={handleEditCategory}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the category from the system.
            </DialogDescription>
          </DialogHeader>
          <div className="py-3">
            <p>Are you sure you want to delete &quot;{editCategory?.categoryName}&quot;?</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => editCategory && handleDeleteCategory(editCategory.categoryId)}>
              Delete Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Manage_Categories;
