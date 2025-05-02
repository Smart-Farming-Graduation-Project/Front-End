"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getTokenClient } from "@/app/utils/api/getTokenClient";
import API_BASE_URL from "@/app/utils/api/base";
import { useAuth } from "@/app/utils/contexts/AuthContext";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import { HiDotsVertical } from "react-icons/hi";
import moment from "moment";
import UserDetails from "./UserDetails";

type CommentProps = {
  id: number;
  postId: number;
  userId: string;
  content: string;
  createdAt: string;
  parentCommentId: number | null;
  voteCount: number;
};

type CommentsProps = {
  postId: number;
  isOpen: boolean;
  onCommentAdded?: (postId: number) => void;
};

const Comments = ({ postId, isOpen, onCommentAdded }: CommentsProps) => {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [selectedComment, setSelectedComment] = useState<CommentProps | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [voteStates, setVoteStates] = useState<{ [commentId: number]: "up" | "down" | null }>({});

  const { user } = useAuth();
  const token = getTokenClient();

  const fetchComments = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/Comments/GetComments/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments(response.data.data || []);

      const initialVoteStates: Record<number, "up" | "down" | null> = {};
      (response.data.data || []).forEach((comment: CommentProps) => {
        initialVoteStates[comment.id] = null;
      });
      setVoteStates(initialVoteStates);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setLoading(false);
    }
  }, [postId, token]);

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen, fetchComments]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !token) return;

    try {
      const response = await axios.post(
        `${API_BASE_URL}/Comments/CreateComment`,
        {
          postId: postId,
          parentCommentId: 0,
          content: newComment.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const newCommentData = {
        id: response.data.data.id,
        content: newComment.trim(),
        postId: postId,
        userId: user?.sub || "",
        parentCommentId: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        voteCount: 0,
      };
      setComments((prevComments) => [...prevComments, newCommentData]);
      setNewComment("");
      if (onCommentAdded) {
        onCommentAdded(postId);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const toggleMenu = (commentId: number) => {
    setMenuOpenId(menuOpenId === commentId ? null : commentId);
  };

  const handleUpdateComment = (updatedComment: { id: number; content: string }) => {
    setComments(comments.map((comment) => (comment.id === updatedComment.id ? { ...comment, content: updatedComment.content } : comment)));
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  const handleVote = async (commentId: number, voteType: 1 | -1) => {
    if (!token) {
      console.log("No token available");
      return;
    }

    const currentVote = voteStates[commentId];
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
          targetId: commentId,
          targetType: "Comment",
          voteType: voteType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setComments(comments.map((comment) => (comment.id === commentId ? { ...comment, voteCount: comment.voteCount + voteCountChange } : comment)));

      setVoteStates((prev) => ({
        ...prev,
        [commentId]: voteType === 1 ? "up" : "down",
      }));
    } catch (error) {
      console.error("Error voting on comment:", error);
    }
  };

  const handleRemoveVote = async (commentId: number) => {
    if (!token) {
      console.log("No token available");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/Votes/DeleteVote`, {
        data: {
          targetId: commentId,
          targetType: "Comment",
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                voteCount: voteStates[commentId] === "up" ? comment.voteCount - 1 : voteStates[commentId] === "down" ? comment.voteCount + 1 : comment.voteCount,
              }
            : comment
        )
      );

      setVoteStates((prev) => ({ ...prev, [commentId]: null }));
    } catch (error) {
      console.error("Error removing vote from comment:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="comments-section mt-4 border-t pt-4">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>

      {/* Add Comment Form */}
      <div className="flex gap-2 mb-6">
        <Input value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." className="flex-grow" />
        <Button onClick={handleAddComment} className="bg-green text-white">
          Add
        </Button>
      </div>

      {/* Comments List */}
      {loading ? (
        <p className="text-[#6b7280]">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-[#6b7280]">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-[#f9f9f9] p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <UserDetails userId={comment.userId} showTimestamp={true} timestamp={moment(comment.createdAt).add(3, "hours").fromNow()} />

                {user?.sub === comment.userId && (
                  <div className="controls relative">
                    <button onClick={() => toggleMenu(comment.id)} className="p-1 hover:bg-[#f3f4f6] rounded">
                      <HiDotsVertical size={18} className="text-[#6b7280] cursor-pointer" />
                    </button>
                    {menuOpenId === comment.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-[#ffffff] border border-[#e5e7eb] rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => {
                            setMenuOpenId(null);
                            setSelectedComment(comment);
                            setIsEditDialogOpen(true);
                          }}
                          className="block w-full px-4 py-2 text-sm text-[#374151] hover:bg-[#f3f4f6] text-left">
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setMenuOpenId(null);
                            setSelectedComment(comment);
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

              <p className="mt-2 text-[#4b5563] text-md">{comment.content}</p>

              {/* Comment Actions */}
              <div className="flex items-center gap-3 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-1 ${voteStates[comment.id] === "up" ? "text-[#22c55e]" : "text-[#6b7280]"} hover:text-[#22c55e] h-auto py-1 px-2`}
                  onClick={() => (voteStates[comment.id] === "up" ? handleRemoveVote(comment.id) : handleVote(comment.id, 1))}>
                  <FaArrowUp className="w-3 h-3 mr-1" />
                  <span className="text-xs">{comment.voteCount}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-1 ${voteStates[comment.id] === "down" ? "text-[#ef4444]" : "text-[#6b7280]"} hover:text-[#ef4444] h-auto py-1 px-2`}
                  onClick={() => (voteStates[comment.id] === "down" ? handleRemoveVote(comment.id) : handleVote(comment.id, -1))}>
                  <FaArrowDown className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit & Delete Dialogs */}
      {selectedComment && (
        <>
          <EditComment
            comment={selectedComment}
            isOpen={isEditDialogOpen}
            onClose={() => {
              setIsEditDialogOpen(false);
              setSelectedComment(null);
            }}
            onUpdate={handleUpdateComment}
          />
          <DeleteComment
            commentId={selectedComment.id}
            isOpen={isDeleteDialogOpen}
            onClose={() => {
              setIsDeleteDialogOpen(false);
              setSelectedComment(null);
            }}
            onDelete={handleDeleteComment}
          />
        </>
      )}
    </div>
  );
};

export default Comments;
