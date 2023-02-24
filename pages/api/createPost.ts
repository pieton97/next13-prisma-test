// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';

type dataProps = {
  title: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const post: dataProps = JSON.parse(req.body);
    console.log(post);
    if (req.method === 'POST') {
      // checking for title length
      if (!post.title.length) {
        return res.status(500).json({ message: 'please dont leave this empty' });
      }
      try {
        const data = await prisma.post.create({
          data: {
            title: post.title
          }
        });
        res.status(200).json(data);
      } catch (err) {
        return res.status(500).json({ message: 'error creating new post' });
      }
    }
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
}
