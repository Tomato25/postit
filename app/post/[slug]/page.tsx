"use client";

import AddComment from "@/app/components/AddComment";
import Post from "@/app/components/Post";
import { PostType } from "@/app/types/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";


type Comment = {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
    message: string;
    user: {
      email: string;
      name: string;
      id: string;
      image: string;
    };
}

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });

  if (isLoading) return "Loading...";
  console.log(data);

  return (
    <>
      <Post
        id={data?.id}
        name={data.user.name}
        avatar={data.user.image}
        postTitle={data.title}
        Comment={data.Comment}
      />
      <AddComment id={data?.id} />
      {data?.Comment?.map((comment: Comment) => (
        <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
          <div className="flex items-center gap-2">
            <Image
              width={24}
              height={24}
              src={comment.user?.image}
              alt="avatar"
              className="rounded-full"
            />
            <h3 className="font-bold">{comment.user?.name}</h3>
            <h3 className="text-sm">{comment.createdAt}</h3>

          </div>
          <div className="p-4">{comment.message}</div>
        </div>
      ))}
    </>
  );
}
