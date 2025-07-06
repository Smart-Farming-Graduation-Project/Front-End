"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getTokenClient } from "@/app/utils/api/getTokenClient";
import API_BASE_URL from "@/app/utils/api/base";
import { useAuth } from "@/app/utils/contexts/AuthContext";
import { useUserData } from "@/app/utils/hooks/useUserData";

const AddPost = () => {
  const [isAddPostDialogOpen, setIsAddPostDialogOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const { user } = useAuth();
  const { userData, isLoading: isLoadingUser } = useUserData(user?.sub);
  const token = getTokenClient();

  const handleAddPost = async () => {
    if (!postTitle.trim() || !postContent.trim()) {
      return;
    }
    if (!token) {
      console.log("No token available");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/Posts/CreatePost`,
        {
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
      console.log("Post created:", response.data);
      setPostTitle("");
      setPostContent("");
      setIsAddPostDialogOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 bg-[#f2f3f3] p-4 rounded-lg">
        {userData && (
          <div className="w-10 h-10 relative rounded-full overflow-hidden bg-gray-100">
            {userData.imageUrl ? (
              <Image src={userData.imageUrl} alt={`${userData.firstName} ${userData.lastName}'s avatar`} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {userData.firstName.charAt(0)}
                  {userData.lastName.charAt(0)}
                </span>
              </div>
            )}
          </div>
        )}

        {isLoadingUser && <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>}

        <Dialog open={isAddPostDialogOpen} onOpenChange={setIsAddPostDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full text-start text-[#6b7280] border-[#e5e7eb] hover:bg-[#f3f4f6] py-6 rounded-lg">
              What&apos;s on your mind, {userData?.firstName || user?.given_name}?
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Post</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="w-full text-start">
                <Label>Title</Label>
                <Input value={postTitle} onChange={(e) => setPostTitle(e.target.value)} placeholder="Enter post title" required />
              </div>
              <div className="w-full text-start">
                <Label>Content</Label>
                <Textarea value={postContent} onChange={(e) => setPostContent(e.target.value)} placeholder="Write your post content here..." className="w-full font-[cairo] rounded-lg" />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button onClick={handleAddPost} className="bg-green text-[#ffffff]">
                Submit
              </Button>
              <Button variant="outline" onClick={() => setIsAddPostDialogOpen(false)} className="text-[#1f2937] border-[#e5e7eb]">
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AddPost;
