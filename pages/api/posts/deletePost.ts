import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);        
    
    //Check if user is logged in
    if (!session)                                                                       
      return res.status(401).json({ message: "Please sign in" });

    //Delete post
    try {
        const postId = req.body
        const result = await prisma.post.delete({
            where: {
                id:postId
            },
        })
        res.status(200).json(result)
    } catch (err) {
        res.status(403).json({ message: "Error has occured while deleteing your post"})
    }
  }
}
