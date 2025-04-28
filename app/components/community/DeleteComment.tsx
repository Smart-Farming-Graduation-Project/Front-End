"use client";
import React from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getTokenClient } from "@/app/utils/api/getTokenClient";
import API_BASE_URL from "@/app/utils/api/base";

type DeleteCommentProps = {
  commentId: number;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (commentId: number) => void;
};

const DeleteComment = ({ commentId, isOpen, onClose, onDelete }: DeleteCommentProps) => {
  const token = getTokenClient();

  const handleDeleteComment = async () => {
    if (!token) {
      console.log("No token available");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/Comments/DeleteComment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      onDelete(commentId);
      onClose();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Comment</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this comment?</p>
        <DialogFooter>
          <Button 
            onClick={handleDeleteComment} 
            className="bg-[#ef4444] text-[#ffffff] hover:bg-[#dc2626]"
          >
            Delete
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="text-[#1f2937] border-[#e5e7eb]"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteComment;