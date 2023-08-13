import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";



export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);

    //Check if user is logged in
    if (!session) return res.status(401).json({ message: "Please sign in" });

    //Get Auth User Posts
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        },
        include: {
          Post: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              Comment: true,
            },
          },
        },
      });
      res.status(200).json(data);
    } catch (err) {
      res
        .status(403)
        .json({ message: "Error has occured while retrieving posts" });
    }
  }
}
