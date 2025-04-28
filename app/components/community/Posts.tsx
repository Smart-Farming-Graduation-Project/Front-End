"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaShareAlt, FaComment, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import avatar from "@/app/assets/images/abdo.jpg";
import { getTokenClient } from "@/app/utils/api/getTokenClient";
import API_BASE_URL from "@/app/utils/api/base";
import { useAuth } from "@/app/utils/contexts/AuthContext";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import Comments from "./Comments";
import { UserPostProps } from "@/app/utils/types/app";
import moment from "moment";
type VoteState = {
  [postId: number]: "up" | "down" | null;
};

const Posts = () => {
  const [posts, setPosts] = useState<UserPostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<UserPostProps | null>(null);
  const [voteStates, setVoteStates] = useState<VoteState>({});
  const [commentsOpenPostId, setCommentsOpenPostId] = useState<number | null>(null);
  const [commentCounts, setCommentCounts] = useState<Record<number, number>>({});

  const { user, isLoading } = useAuth();
  const token = getTokenClient();

  const fetchCommentCounts = useCallback(
    async (postsData: UserPostProps[]) => {
      if (!token || !postsData.length) return;

      const counts: Record<number, number> = {};

      for (const post of postsData) {
        try {
          const response = await axios.get(`${API_BASE_URL}/Comments/GetComments/${post.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          counts[post.id] = (response.data.data || []).length;
        } catch (error) {
          console.error(`Error fetching comment count for post ${post.id}:`, error);
          counts[post.id] = 0;
        }
      }

      setCommentCounts(counts);
    },
    [token]
  );

  useEffect(() => {
    const fetchPosts = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${API_BASE_URL}/Posts/GetPosts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data.data);
        fetchCommentCounts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token, fetchCommentCounts]);

  if (isLoading) return <p>Loading...</p>;

  const toggleMenu = (postId: number) => {
    setMenuOpenId(menuOpenId === postId ? null : postId);
  };

  const toggleComments = (postId: number) => {
    setCommentsOpenPostId(commentsOpenPostId === postId ? null : postId);
  };

  const handleEditUpdate = (updatedPost: { id: number; title: string; content: string }) => {
    setPosts(posts.map((post) => (post.id === updatedPost.id ? { ...post, title: updatedPost.title, content: updatedPost.content } : post)));
  };

  const handlePostDelete = (postId: number) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleVote = async (postId: number, voteType: 1 | -1) => {
    if (!token) {
      console.log("No token available");
      return;
    }

    const currentVote = voteStates[postId];
    let voteCountChange: number = voteType;

    if (currentVote === "up" && voteType === -1) {
      voteCountChange = -2;
    } else if (currentVote === "down" && voteType === 1) {
      voteCountChange = 2;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/Votes/Vote`,
        {
          targetId: postId,
          targetType: "Post",
          voteType: voteType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPosts(posts.map((post) => (post.id === postId ? { ...post, voteCount: post.voteCount + voteCountChange } : post)));
      setVoteStates((prev) => ({
        ...prev,
        [postId]: voteType === 1 ? "up" : "down",
      }));
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const handleRemoveVote = async (postId: number) => {
    if (!token) {
      console.log("No token available");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/Votes/DeleteVote`, {
        data: {
          targetId: postId,
          targetType: "Post",
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                voteCount: voteStates[postId] === "up" ? post.voteCount - 1 : voteStates[postId] === "down" ? post.voteCount + 1 : post.voteCount,
              }
            : post
        )
      );
      setVoteStates((prev) => ({ ...prev, [postId]: null }));
    } catch (error) {
      console.error("Error removing vote:", error);
    }
  };

  const handleCommentAdded = (postId: number) => {
    setCommentCounts((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1,
    }));
  };

  return (
    <div className="posts" dir="ltr">
      {loading ? (
        <p className="text-[#6b7280]">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-[#6b7280]">No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post mb-6 bg-[#f7f7f78c] p-2 rounded-lg shadow-md font-[cairo] w-full max-w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image src={avatar} alt="User Avatar" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <span className="font-medium text-[#1f2937] font-[roboto]">{post.userId}</span>
                  <span className="block text-sm text-[#6b7280] font-[roboto]">{moment(post.createdAt).fromNow()}</span>
                </div>
              </div>
              {user?.sub === post.userId && (
                <div className="controls relative">
                  <button onClick={() => toggleMenu(post.id)} className="p-1 hover:bg-[#f3f4f6] rounded">
                    <HiDotsVertical size={25} className="text-[#6b7280] cursor-pointer" />
                  </button>
                  {menuOpenId === post.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#ffffff] border border-[#e5e7eb] rounded-lg shadow-lg z-10">
                      <button
                        onClick={() => {
                          setMenuOpenId(null);
                          setSelectedPost(post);
                          setIsEditDialogOpen(true);
                        }}
                        className="block w-full px-4 py-2 text-sm text-[#374151] hover:bg-[#f3f4f6] text-left">
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setMenuOpenId(null);
                          setSelectedPost(post);
                          setIsDeleteDialogOpen(true);
                        }}
                        className="block w-full px-4 py-2 text-sm text-[#dc2626] hover:bg-[#f3f4f6] text-left">
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <h2 className="mt-2 text-xl font-semibold text-[#1f2937] font-[cairo]">{post.title}</h2>
            <p className="mt-2 text-[#4b5563]">{post.content}</p>
            <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="ghost"
                  className={`flex items-center gap-1 ${voteStates[post.id] === "up" ? "text-[#22c55e]" : "text-[#6b7280]"} hover:text-[#22c55e]`}
                  onClick={() => (voteStates[post.id] === "up" ? handleRemoveVote(post.id) : handleVote(post.id, 1))}>
                  <FaArrowUp className="w-4 h-4" />
                  <span>{post.voteCount}</span>
                </Button>
                <Button
                  variant="ghost"
                  className={`flex items-center gap-1 ${voteStates[post.id] === "down" ? "text-[#ef4444]" : "text-[#6b7280]"} hover:text-[#ef4444]`}
                  onClick={() => (voteStates[post.id] === "down" ? handleRemoveVote(post.id) : handleVote(post.id, -1))}>
                  <FaArrowDown className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="flex items-center gap-1 text-[#6b7280] hover:text-[#22c55e]" onClick={() => toggleComments(post.id)}>
                  <FaComment className="w-4 h-4" />
                  <span>{commentCounts[post.id] || 0}</span>
                </Button>
              </div>
              <Button variant="ghost" className="flex items-center gap-1 text-[#6b7280] hover:text-[#22c55e]">
                <FaShareAlt className="w-4 h-4" />
                <span>Share</span>
              </Button>
            </div>

            {/* Comments Section */}
            {commentsOpenPostId === post.id && <Comments postId={post.id} isOpen={true} onCommentAdded={handleCommentAdded} />}
          </div>
        ))
      )}
      {selectedPost && (
        <>
          <EditPost
            post={selectedPost}
            isOpen={isEditDialogOpen}
            onClose={() => {
              setIsEditDialogOpen(false);
              setSelectedPost(null);
            }}
            onUpdate={handleEditUpdate}
          />
          <DeletePost
            postId={selectedPost.id}
            isOpen={isDeleteDialogOpen}
            onClose={() => {
              setIsDeleteDialogOpen(false);
              setSelectedPost(null);
            }}
            onDelete={handlePostDelete}
          />
        </>
      )}
    </div>
  );
};

export default Posts;
