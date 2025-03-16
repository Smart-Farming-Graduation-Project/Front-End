"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getTokenClient } from "@/app/utils/api/getTokenClient";
import API_BASE_URL from "@/app/utils/api/base";

type EditPostProps = {
  post: { id: number; title: string; content: string };
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedPost: { id: number; title: string; content: string }) => void;
};

const EditPost = ({ post, isOpen, onClose, onUpdate }: EditPostProps) => {
  const [postTitle, setPostTitle] = useState(post.title);
  const [postContent, setPostContent] = useState(post.content);
  const token = getTokenClient();

  const handleEditPost = async () => {
    if (!postTitle.trim() || !postContent.trim()) {
      return;
    }
    if (!token) {
      console.log("No token available");
      return;
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/Posts/UpdatePost/${post.id}`,
        {
          id: post.id,
          title: postTitle.trim(),
          content: postContent.trim(),
          sharedPostId: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Post updated:", response.data);
      onUpdate({ id: post.id, title: postTitle, content: postContent });
      onClose();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="w-full text-start">
            <Label>Title</Label>
            <Input
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Enter post title"
              required
            />
          </div>
          <div className="w-full text-start">
            <Label>Content</Label>
            <Textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Write your post content here..."
              className="w-full font-[cairo] rounded-lg"
            />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button
            onClick={handleEditPost}
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

export default EditPost;