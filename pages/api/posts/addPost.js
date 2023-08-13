import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";


export default async function handler(
  req,
  res,
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);        
    
    //Check if user is logged in
    if (!session)                                                                       
      return res.status(401).json({ message: "Please sign in to make post" });

    const title= req.body.title;


    //Get User
    const prismaUser = await prisma.user.findUnique({
        where: {email: session?.user?.email}
    })

    //Check title 
    if (title.length > 300)
      return res.status(403).json({ message: "Please write a shorter post" });
    if (!title.length)
      return res
        .status(401)
        .json({ message: "Please do not leave this empty" });

    //Create post
    try {
        const result = await prisma.post.create({
            data: {
                title,
                userId: prismaUser.id
            }
        })
        res.status(200).json(result)
    } catch (err) {
        res.status(403).json({ message: "Error has occured whilst making a post"})
    }
  }
}
