import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryType } from "@/app/utils/types/app";
import { getTokenClient } from "@/app/utils/api/getTokenClient";
import API_BASE_URL from "@/app/utils/api/base";

const Manage_Categories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDesc, setNewCategoryDesc] = useState("");
  const [editCategory, setEditCategory] = useState<CategoryType | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch Token
  const token = getTokenClient();

  useEffect(() => {
    const getCategories = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/Category/CategoryList`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.succeeded) {
          setCategories(response.data.data);
        } else {
          throw new Error(response.data.message || "Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, [token]);

  // Add Category
  const handleAddCategory = async () => {
    if (!newCategoryName || !newCategoryDesc) {
      return;
    }
    if (!token) {
      return;
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}/Category/Create`,
        {
          name: newCategoryName.trim(),
          description: newCategoryDesc.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories([...categories, response.data]);
      setNewCategoryName("");
      setNewCategoryDesc("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Delete Category
  const handleDeleteCategory = async (id: number) => {
    if (!token) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/Category/CategoryDelete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(categories.filter((cat) => cat.categoryId !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  // Edit Category
  const handleEditCategory = async () => {
    if (!editCategory || !editCategory.categoryName.trim()) {
      return;
    }
    if (!token) {
      return;
    }

    try {
      await axios.put(
        `${API_BASE_URL}/Category/Category/Update`,
        {
          id: editCategory.categoryId,
          name: editCategory.categoryName.trim(),
          description: editCategory.categoryDescription.toString().trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(categories.map((cat) => (cat.categoryId === editCategory.categoryId ? { ...editCategory } : cat)));
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setIsEditDialogOpen(false);
      setEditCategory(null);
    }
  };

  return (
    <div className="p-4">
      {/* Add */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <Input placeholder="category name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} required className="w-full" />
        <Input placeholder="category description" value={newCategoryDesc} onChange={(e) => setNewCategoryDesc(e.target.value)} required className="w-full" />
        <Button onClick={handleAddCategory} className="bg-green text-[#ffffff] w-full sm:w-auto">
          Add Category
        </Button>
      </div>

      {/* All Categories */}
      <ul className="space-y-2">
        {loading && <p>Loading...</p>}
        {categories.map((category) => (
          <li key={category.categoryId} className="flex flex-col md:flex-row items-center justify-between p-2 bg-[#f3f4f6] rounded-md">
            <div className="text-start">
              <span className="font-medium">{category.categoryName}</span>
              <span className="block text-sm text-[#4b5563]">{category.categoryDescription.toString()}</span>
            </div>
            <div className="flex gap-2">
              {/* Dialog Edit */}
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="text-[#1f2937] border-[#e5e7eb] hover:bg-[#e5e7eb]" onClick={() => setEditCategory(category)}>
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="mb-2">Edit Category</DialogTitle>
                  </DialogHeader>
                  <Input
                    value={editCategory?.categoryName || ""}
                    onChange={(e) =>
                      setEditCategory({
                        ...editCategory,
                        categoryName: e.target.value,
                      } as CategoryType)
                    }
                    placeholder="Edit category name"
                    className="mb-2"
                  />
                  <Input
                    value={editCategory?.categoryDescription.toString() || ""}
                    onChange={(e) =>
                      setEditCategory({
                        ...editCategory,
                        categoryDescription: e.target.value,
                      } as unknown as CategoryType)
                    }
                    placeholder="Edit category description"
                  />
                  <DialogFooter className="mt-4">
                    <Button onClick={handleEditCategory} className="bg-[#22c55e] text-[#ffffff]">
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="text-[#1f2937] border-[#e5e7eb]">
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Dialog Delete */}
              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="bg-[#ef4444] text-[#ffffff] hover:bg-[#dc2626]">
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Category</DialogTitle>
                  </DialogHeader>
                  <p>Are you sure you want to delete &quot;{category.categoryName}&quot;?</p>
                  <DialogFooter>
                    <Button onClick={() => handleDeleteCategory(category.categoryId)} className="bg-[#ef4444] text-[#ffffff]">
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

export default Manage_Categories;
