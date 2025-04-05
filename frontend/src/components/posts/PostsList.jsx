
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import "./postCss.css";
import { deletePostAPI, fetchAllPosts } from "../../APIServices/posts/postsAPI";
import { Link } from "react-router-dom";
import NoDataFound from "../Alert/NoDataFound";
import AlertMessage from "../Alert/AlertMessage";
import truncateString from "../../utils/truncateString";
const PostsList = () => {

  // ! use query
  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ["lists-posts"],
    queryFn: fetchAllPosts,
  });
  console.log(data);

  // post mutation
  const postMutation = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: deletePostAPI,
  });

  return (
    <section className="overflow-hidden">
      <div className="container px-4 mx-auto">
        <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6 mt-16">
          Blog
        </h1>
        <h2 className="text-4xl font-bold font-heading mb-10">
          Latest articles
        </h2>
        {/* Show alert  */}
        {data?.posts?.length <= 0 && <NoDataFound text="No Post Found" />}
        {isError && <AlertMessage type="error" message="Something happened" />}
        {isLoading && (
          <AlertMessage type="loading" message="Loading please wait" />
        )}

        <div className="flex flex-wrap mb-32 -mx-4">
          {/* Posts */}
          {data?.posts?.map((post) => (
            <div key={post._id} className="w-full md:w-1/2 lg:w-1/3 p-4">
              <Link to={`/posts/${post._id}`}>
                <div className="bg-white border border-gray-100 hover:border-purple-500 transition duration-200 rounded-2xl h-full p-3">
                  <div className="relative" style={{ height: 240 }}>
                    <div className="absolute top-0 left-0 z-10"></div>
                    <div className="absolute bottom-0 right-0 z-10"></div>
                    <img
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                      src={post?.image?.path}
                      alt={post?._id}
                    />
                  </div>
                  <div className="pt-6 pb-3 px-4">
                    <div
                      className="rendered-html-content mb-2"
                      dangerouslySetInnerHTML={{
                        __html: truncateString(post?.description, 200),
                      }}
                    />
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-gray-500 text-sm">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={4}
                        height={4}
                        viewBox="0 0 4 4"
                        fill="none"
                      >
                        <circle cx={2} cy={2} r={2} fill="#B8B8B8" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat opacity-20 transition-opacity duration-300" style={{
        backgroundImage: 'url("/pencils.jpg")',
      }} />
    </section>
  );
};

export default PostsList;