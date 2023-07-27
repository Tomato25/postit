import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../prisma/client";
import { AuthOptions } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  authOptions: AuthOptions 

) {
  if (req.method === "GET") {
    
    //Fetch all post
    try {
        const data = await prisma.post.findMany({
          include: {
            user: true,
            Comment: true
          },
          orderBy: {
            createdAt: "desc",
          }
        })
        res.status(200).json(data)
    } catch (err) {
        res.status(403).json({ message: "Error fetching posts"})
    }
  }
}
