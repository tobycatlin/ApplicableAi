import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/db/prisma";
import { Prisma } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import bcrypt from "bcrypt";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || !token.sub) {
    res.status(401).end();
    return;
  }

  const { currentPassword, password } = req.body;

  if (typeof currentPassword !== "string" || typeof password !== "string") {
    res.status(400).json({ error: "Invalid value" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: token.sub },
      select: { password: true }
    });

    if (user === null) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const currentPasswordHash = user.password!;
    const passwordMatch = await bcrypt.compare(
      currentPassword, currentPasswordHash);
    if (!passwordMatch) {
      res.status(401).json({ error: "Incorrect current password" });
      return;
    }

    const id = token.sub;
    await prisma.user.update({
      where: { id },
      data: {
        password: await bcrypt.hash(password, 10)
      }
    });

    res.end();

  } catch (e) {
    console.error(e);
    if (e instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({ error: "Invalid value" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}