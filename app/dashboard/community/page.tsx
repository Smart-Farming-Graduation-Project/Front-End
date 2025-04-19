import AddPost from "@/app/components/community/AddPost";
import Posts from "@/app/components/community/Posts";
import React from "react";

const Community = () => {
  return (
    <div className="flex-1">
      <div className="p-2 mt-12 md:mt-0">
        <h1 className="text-2xl font-bold ">Community</h1>
        <span className="block h-1 w-14 bg-green rounded-lg"></span>
      </div>
      <div className="container">
        <div className="mt-4">
          <AddPost />
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default Community;
