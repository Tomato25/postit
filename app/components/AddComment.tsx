"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios, {AxiosError} from "axios";
import toast from "react-hot-toast";


type PostProps = {
    id?: string
}

type Comment = {
    postId?: string,
    title: string
}

export default function AddComment({id} : PostProps) {

  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  let toastPostID: string
  const queryClient = useQueryClient()



    //Create a comment
const {mutate} = useMutation(
    async (data: Comment) => await axios.post('/api/posts/addComment', {data} ),
    {onError: (error) => {
        if(error instanceof AxiosError){
          toast.error(error?.response?.data.message)
        }
        setIsDisabled(false)
        console.log(toastPostID)
    },
  onSuccess: (data) => {
    toast.success("Comment has been made")
    queryClient.invalidateQueries(["comments"])
    setTitle('')
    setIsDisabled(false)
    queryClient.invalidateQueries(["detail-post"])
  }}
  )
  
  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    toastPostID = toast.loading ("Creating your comment")
    setIsDisabled(true)
    mutate({title, postId:id})
  }

  return (
    <form onSubmit={submitComment} className="py-8">
      <h3>Add a comment</h3>
      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2"
        />
        </div>
        <div className="flex items-center gap-2">
        <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}>{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Add Comment
        </button>
      </div>
    </form>
  );
}
