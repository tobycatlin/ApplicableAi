import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/db/prisma";
import { Prisma } from "@prisma/client";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = req.body.id as string;
    const response = await prisma.user.update({
      where: { id },
      data: {
        emailVerified: true
      }
    });

    res.json(response);

  } catch (e) {
    console.error(e);
    if (e instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({ error: "Invalid value" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}