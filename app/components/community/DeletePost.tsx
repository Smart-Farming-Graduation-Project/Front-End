"use client";
import React from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getTokenClient } from "@/app/utils/api/getTokenClient";
import API_BASE_URL from "@/app/utils/api/base";

type DeletePostProps = {
  postId: number;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (postId: number) => void;
};

const DeletePost = ({ postId, isOpen, onClose, onDelete }: DeletePostProps) => {
  const token = getTokenClient();

  const handleDeletePost = async () => {
    if (!token) {
      console.log("No token available");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/Posts/DeletePost/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Post deleted:", postId);
      onDelete(postId);
      onClose();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this post?</p>
        <DialogFooter>
          <Button onClick={handleDeletePost} className="bg-[#ef4444] text-[#ffffff] hover:bg-[#dc2626]">
            Delete
          </Button>
          <Button variant="outline" onClick={onClose} className="text-[#1f2937] border-[#e5e7eb]">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePost;
