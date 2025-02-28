import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  FaEye,
  FaDollarSign,
  FaUsers,
  FaThumbsUp,
  FaThumbsDown,
  FaFlag,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import {userProfileAPI} from "../../APIServices/users/usersAPI";
import AlertMessage from "../Alert/AlertMessage";

const AccountSummaryDashboard = ({}) => {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: userProfileAPI,
  });
  //get user posts

  const userPosts = data?.user?.posts?.length;

  //initial counters

  let totalViews = 0;
  let totalLikes = 0;
  let totalDislikes = 0;

  //loop through the users posts to update the initial counters

  data?.user?.posts?.forEach((post) => {
    totalViews += post.viewers.length;
    totalLikes += post.likes.length;
    totalDislikes += post.dislikes.length;
  });


  const stats = [
    {
      icon: <FaEye />,
      label: "Views",
      value: totalViews,
      bgColor: "bg-blue-500",
    },

    {
      icon: <FaThumbsUp />,
      label: "Likes",
      value: totalLikes || 0,
      bgColor: "bg-yellow-500",
    },
    {
      icon: <FaThumbsDown />,
      label: "Dislikes",
      value: totalDislikes || 0,
      bgColor: "bg-red-500",
    },

    {
      icon: <FaFlag />,
      label: "Posts",
      value: userPosts || 0,
      bgColor: "bg-pink-500",
    },
  
  ];

  return (
    <div className="p-4">
      <p
        className="
       font-bold text-2xl text-gray-800 mb-4
      "
      >
        Welcome Back!
      </p>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} text-white rounded-lg shadow-lg p-6`}
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{stat.icon}</div>
              <div>
                <div className="text-xl font-semibold">{stat.value}</div>
                <div className="text-sm">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountSummaryDashboard;