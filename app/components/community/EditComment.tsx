"use client";
import React, { useState } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getTokenClient } from "@/app/utils/api/getTokenClient";
import API_BASE_URL from "@/app/utils/api/base";

type EditCommentProps = {
  comment: { id: number; content: string };
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedComment: { id: number; content: string }) => void;
};

const EditComment = ({ comment, isOpen, onClose, onUpdate }: EditCommentProps) => {
  const [commentContent, setCommentContent] = useState(comment.content);
  const token = getTokenClient();

  const handleEditComment = async () => {
    if (!commentContent.trim()) {
      return;
    }
    if (!token) {
      console.log("No token available");
      return;
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/Comments/UpdateComment/${comment.id}`,
        {
          id: comment.id,
          content: commentContent.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        console.error("Failed to update comment:", response.data);
        return;
      }
      // Update the comment in the parent component
      onUpdate({ id: comment.id, content: commentContent });
      onClose();
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Comment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="w-full text-start">
            <Label>Comment</Label>
            <Textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Edit your comment..."
              className="w-full font-[cairo] rounded-lg"
            />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button
            onClick={handleEditComment}
            className="bg-green text-[#ffffff]"
          >
            Save
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

export default EditComment;