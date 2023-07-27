"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPosts } from "../types/authPosts";
import EditPost from "./EditPost";

const fetchAuthPosts = async () => {
  const response = await axios.get("/api/posts/authPosts");
  return response.data;
};

export default function myPosts() {
  const { data, isLoading } = useQuery<AuthPosts>({
    queryFn: fetchAuthPosts,
    queryKey: ["auth-posts"],
  });
if(isLoading) return  <h1>Posts are loading...</h1>
console.log(data)
  return (
    <div>
           {data?.Post?.map((post) => <EditPost id={post.id} key={post.id} avatar={data.image} name={data.name} title={post.title} comments={post.Comment} /> )}
    </div>
  );
}
