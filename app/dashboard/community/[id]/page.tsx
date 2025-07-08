"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getTokenClient } from "@/app/utils/api/getTokenClient";
import API_BASE_URL from "@/app/utils/api/base";
import { FaArrowUp, FaArrowDown, FaShareAlt, FaArrowLeft } from "react-icons/fa";
import Comments from "@/app/components/community/Comments";
import moment from "moment";
import { useAuth } from "@/app/utils/contexts/AuthContext";

type PostType = {
  id: number;
  userId: string;
  userName: string;
  userImageUrl: string;
  title: string;
  content: string;
  voteCount: number;
  createdAt: string;
  updatedAt: string | null;
  userVoteStatus: number;
};

const PostDetails = () => {
  const params = useParams();
  const router = useRouter();
  const postId = Number(params.id);
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const token = getTokenClient();

  useEffect(() => {
    const fetchPostDetails = async () => {
      if (!token || isNaN(postId)) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/Posts/GetPost/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPost(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post details:", error);
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [token, postId]);

  const handleVote = async (voteType: 1 | -1) => {
    if (!token || !post) return;

    const currentVote = post.userVoteStatus;
    let voteCountChange: number = voteType;

    if (currentVote === 1 && voteType === -1) {
      voteCountChange = -2;
    } else if (currentVote === -1 && voteType === 1) {
      voteCountChange = 2;
    } else if (currentVote === voteType) {
      voteCountChange = -voteType;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/Votes/Vote`,
        {
          targetId: post.id,
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

      setPost({
        ...post,
        voteCount: post.voteCount + voteCountChange,
        userVoteStatus: currentVote === voteType ? 0 : voteType,
      });
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const handleRemoveVote = async () => {
    if (!token || !post) return;

    try {
      await axios.delete(`${API_BASE_URL}/Votes/DeleteVote`, {
        data: {
          targetId: post.id,
          targetType: "Post",
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setPost({
        ...post,
        voteCount: post.voteCount - post.userVoteStatus,
        userVoteStatus: 0,
      });
    } catch (error) {
      console.error("Error removing vote:", error);
    }
  };

  const handleCommentAdded = () => {
    // If needed, update some state or refresh data
  };

  if (loading) {
    return (
      <div className="flex-1 p-6">
        <div className="animate-pulse">
          <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-1/4 bg-gray-200 rounded mb-6"></div>
          <div className="h-24 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold text-[#1f2937]">Post not found</h2>
          <p className="text-[#6b7280] mb-4">The post you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push("/dashboard/community")}>Back to Community</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="p-2 mt-12 md:mt-0">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => router.push("/dashboard/community")}>
            <FaArrowLeft className="w-3 h-3" /> Back
          </Button>
        </div>
        <span className="block h-1 w-14 bg-green rounded-lg mb-6"></span>
      </div>

      <div className="container">
        <div className="post bg-[#f7f7f78c] p-4 rounded-lg shadow-md font-[cairo] w-full max-w-full">
          {/* Post Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 relative rounded-full overflow-hidden bg-gray-100">
                <Image src={post.userImageUrl} alt={`${post.userName}'s avatar`} fill className="object-cover" sizes="48px" />
              </div>
              <div>
                <span className="font-medium text-[#1f2937] text-sm">{post.userName}</span>
                <span className="block text-xs text-[#6b7280]">{moment(post.createdAt).add(3, "hours").fromNow()}</span>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[#1f2937] mb-4">{post.title}</h2>
            <p className="text-[#4b5563] text-lg whitespace-pre-wrap">{post.content}</p>
          </div>

          {/* Post Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" className={`flex items-center gap-2 ${post.userVoteStatus === 1 ? "text-[#22c55e]" : "text-[#6b7280]"} hover:text-[#22c55e]`} onClick={() => (post.userVoteStatus === 1 ? handleRemoveVote() : handleVote(1))}>
                <FaArrowUp className="w-4 h-4" />
                <span>{post.voteCount}</span>
              </Button>
              <Button variant="ghost" className={`flex items-center gap-1 ${post.userVoteStatus === -1 ? "text-[#ef4444]" : "text-[#6b7280]"} hover:text-[#ef4444]`} onClick={() => (post.userVoteStatus === -1 ? handleRemoveVote() : handleVote(-1))}>
                <FaArrowDown className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="ghost" className="flex items-center gap-1 text-[#6b7280] hover:text-[#22c55e]">
              <FaShareAlt className="w-4 h-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <Comments postId={post.id} isOpen={true} onCommentAdded={handleCommentAdded} />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
