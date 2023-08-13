import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";
import { NextAuthOptions } from "next-auth";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  authOptions: NextAuthOptions 

) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    //Check if user is logged in
    if (!session) return res.status(401).json({ message: "Please sign in" });

    //Get user

    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    //Add a comment
    try {
      const { title, postId } = req.body.data;

      if (title.length > 300)
        return res.status(403).json({ message: "Please write a shorter post" });
      if (!title.length)
        return res
          .status(401)
          .json({ message: "Please do not leave this empty" });

      const result = await prisma.comment.create({
        data:{
            message: title,
            userId: prismaUser.id,
            postId
        }
      })    

      res.status(200).json(result);
    } catch (err) {
      res
        .status(403)
        .json({ message: "Error has occured while adding your comment" });
    }
  }
}
