import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === "GET") {
    
      //Get Post Details
      try {
        console.log(req.query)
        const postId = req.query.details
        const data = await prisma.post.findUnique({
            where: {
                id:postId
            },
            include: {
                user: true,
                Comment : {
                    orderBy: {
                        createdAt: "desc"
                    },
                    include: {
                        user: true
                    },
                }
            }
        })
          res.status(200).json(data)
      } catch (err) {
          res.status(403).json({ message: "Error has occured while retrieving posts"})
      }
    }
  }
  